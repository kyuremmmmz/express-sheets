const { getSheet } = require('../services/gSheetsService');
require('dotenv');
const SHEET_ID = "1SQOFOEk3JSeYFCFp8714KM6LgEhd3CdR29hwDpTtPf0";
const RANGE = 'Form Responses 1!A2:C';

let cachedData = null;
let lastFetched = 0;
const CACHE_DURATION = 60 * 1000;

exports.getResponses = async (req, res) => {
    const now = Date.now();

    if (cachedData && (now - lastFetched < CACHE_DURATION)) {
        return res.status(200).json({ data: cachedData });
    }

    try {
        const sheets = await getSheet();
        const result = await sheets.spreadsheets.values.get({
            spreadsheetId: SHEET_ID,
            range: RANGE,
        });

        cachedData = result.data.values || [];
        lastFetched = now;

        return res.status(200).json({ data: cachedData });
    } catch (error) {
        console.error('Google Sheets fetch error:', error);
        return res.status(500).json({ error: error });
    }
};
