const express = require('express');
const router = express.Router();
const path = require('path');
const root = __dirname + '../../../public';

const Case = require('../models/case.js');

const recordRoutes = require("../controllers/records.js");
const cors = require("cors");

router.get('/', (req, res) => {
    res.sendFile('index.html', {root});
});

router.get('/test',  recordRoutes.test);

router.get('/data', recordRoutes.record_get);
router.get('/country/:countryId', recordRoutes.record_country_get);

router.get('*', (req, res) => {
    res.sendFile('index.html', {root});
});

module.exports = router;