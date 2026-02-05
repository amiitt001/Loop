
import admin from 'firebase-admin';
import { safeHandler } from '../utils/wrapper.js';
import { checkMethod, ValidationError } from '../utils/errors.js';
import { verifyAdmin } from '../utils/auth.js';
import { ValidationError as CustomValidationError } from '../utils/errors.js';

const db = admin.firestore();

export default safeHandler(async function handler(req, res) {
    // 1. Verify Admin Auth
    await verifyAdmin(req);

    const { id } = req.query;
    if (!id) {
        throw new CustomValidationError('Missing Application ID');
    }

    const appsRef = db.collection('applications').doc(id);
    const docSnap = await appsRef.get();

    if (!docSnap.exists) {
        throw new CustomValidationError('Application not found');
    }

    const appData = docSnap.data();
    const sheetURL = process.env.GOOGLE_SHEET_URL;

    // Helper to sync to sheet
    const syncToSheet = async (params) => {
        if (!sheetURL || !appData.email) return;
        try {
            const formParams = new URLSearchParams();
            formParams.append('email', appData.email);
            for (const [key, value] of Object.entries(params)) {
                formParams.append(key, value);
            }

            await fetch(sheetURL, {
                method: 'POST',
                body: formParams,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
        } catch (error) {
            console.error('Google Sheet Sync Error:', error);
        }
    };

    // DELETE Action
    if (req.method === 'DELETE') {
        await appsRef.delete();

        // Fire and forget sync
        if (appData.email) {
            syncToSheet({ action: 'delete' });
        }

        return res.status(200).json({ message: 'Application deleted successfully' });
    }

    // UPDATE Action (PATCH)
    if (req.method === 'PATCH') {
        const { status } = req.body;
        if (!status) {
            throw new CustomValidationError('Missing status field');
        }

        // validate status allowed values if needed
        await appsRef.update({ status });

        // Fire and forget sync
        if (appData.email) {
            syncToSheet({ action: 'updateStatus', status });
        }

        return res.status(200).json({ message: 'Application status updated' });
    }

    // Method Not Allowed
    res.setHeader('Allow', 'DELETE, PATCH');
    throw new CustomValidationError('Method Not Allowed (Use DELETE or PATCH)');
});
