const express = require('express');
const router = express.Router();
const { getResponses } = require('../controllers/getter');
router.get('/getResponses', getResponses);

module.exports = router;