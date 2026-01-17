
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { name, email, domain, reason, branch, year, college, github } = req.body;

    // Get secrets from environment variables (Server-side only)
    const serviceID = process.env.EMAILJS_SERVICE_ID;
    const templateID = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY; // Optional, for added security/bypassing origin checks

    if (!serviceID || !templateID || !publicKey) {
        return res.status(500).json({ error: 'Server misconfiguration: Missing EmailJS credentials.' });
    }

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

    if (privateKey) {
        data.accessToken = privateKey;
    }

    try {
        const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            return res.status(200).json({ message: 'Email sent successfully!' });
        } else {
            const text = await response.text();
            console.error('EmailJS Error:', text);
            return res.status(500).json({ error: 'Failed to send email via EmailJS', details: text });
        }
    } catch (error) {
        console.error('Server Error:', error);
        return res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
}
