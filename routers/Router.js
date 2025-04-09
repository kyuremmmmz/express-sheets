const express = require('express');
const router = express.Router();
const { getResponses } = require('../controllers/getter');
const { sendmail } = require('../controllers/sendmail');
router.get('/getResponses', getResponses);
router.post('/sendMail', sendmail);
module.exports = router;