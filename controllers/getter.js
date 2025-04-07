const { getSheet } = require('../services/gSheetsService');
require('dotenv');
const SHEET_ID = "1SQOFOEk3JSeYFCFp8714KM6LgEhd3CdR29hwDpTtPf0";
const RANGE = 'Form Responses 1!A2:C';

exports.getResponses = async (req, res) => {
    const sheets = await getSheet();
    const result = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: RANGE,
    });
    res.status(201).json(result.data.values);
};