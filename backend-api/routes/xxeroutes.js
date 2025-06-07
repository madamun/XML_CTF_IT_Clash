const express = require('express');
const router = express.Router();

const { handleXxeParse } = require('../controllers/xxeController.js');

router.post('/', handleXxeParse);

module.exports = router;
