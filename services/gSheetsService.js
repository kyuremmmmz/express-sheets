const { google } = require('googleapis');
const keys = require('../keys.json');

const getClient = async () => {
    const auth = new google.auth.GoogleAuth({
        credentials: keys,
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    });
    return await auth.getClient();
};

exports.getSheet = async () => {
    const authClient = await getClient();
    const sheets = google.sheets({ version: 'v4', auth: authClient });
    return sheets;
};