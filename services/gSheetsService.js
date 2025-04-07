const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.VERCEL_GOOGLE_CLIENT_EMAIL,
        private_key: process.env.VERCEL_GOOGLE_PRIVATE_KEY,
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

exports.getSheet = async () => {
    const authClient = await auth.getClient();
    return google.sheets({ version: 'v4', auth: authClient });
};