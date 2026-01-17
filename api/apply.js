
import admin from 'firebase-admin';

// prevent re-initialization ensuring singleton
if (!admin.apps.length) {
    try {
        const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    } catch (error) {
        console.error('Firebase Admin Initialization Error:', error);
    }
}

const db = admin.firestore();

import dns from 'dns';
import { promisify } from 'util';

const resolveMx = promisify(dns.resolveMx);

async function isValidEmailDomain(email) {
    try {
        const domain = email.split('@')[1];
        if (!domain) return false;

        const addresses = await resolveMx(domain);
        return addresses && addresses.length > 0;
    } catch (error) {
        return false;
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, email, domain, reason, branch, year, college, github } = req.body;

    if (!email || !name) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        // 0. Verify Email Existence (MX Check)
        const isEmailValid = await isValidEmailDomain(email);
        if (!isEmailValid) {
            return res.status(400).json({ error: 'Invalid email address. The domain does not exist or accept emails.' });
        }
        // 1. Check for duplicates (SERVER-SIDE VALIDATION)
        const appsRef = db.collection('applications');
        const snapshot = await appsRef.where('email', '==', email).get();

        if (!snapshot.empty) {
            console.warn(`Duplicate application blocked for: ${email}`);
            return res.status(409).json({ error: 'Application with this email already exists.' });
        }

        // 2. Save to Firestore (Secure Write)
        const newApp = {
            name,
            email,
            domain,
            reason,
            branch,
            year,
            college,
            github,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            status: 'Pending'
        };

        await appsRef.add(newApp);

        // 3. Send Email via EmailJS (Server-side)
        const serviceID = process.env.EMAILJS_SERVICE_ID;
        const templateID = process.env.EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.EMAILJS_PUBLIC_KEY;
        const privateKey = process.env.EMAILJS_PRIVATE_KEY;

        if (serviceID && templateID && publicKey) {
            const templateParams = {
                name,
                email,
                domain,
                reason,
                branch,
                year,
                college,
                github,
                reply_to: "technova@galgotias.edu"
            };

            const data = {
                service_id: serviceID,
                template_id: templateID,
                user_id: publicKey,
                template_params: templateParams
            };

            if (privateKey) data.accessToken = privateKey;

            const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!emailResponse.ok) {
                console.error('EmailJS Error:', await emailResponse.text());
                // We don't fail the request here because the DB write was successful
            }
        }

        return res.status(200).json({ message: 'Application received successfully!' });

    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
