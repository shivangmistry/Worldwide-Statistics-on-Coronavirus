const express = require('express');
const router = express.Router();
const path = require('path');
const root = __dirname + '../../../public';

const Case = require('../models/case');

router.get('/', (req, res) => {
    res.sendFile('index.html', {root});
});

router.get('/data', (req, res) => {
    Case.findOne({"Country":"China"}, function(err, result){
        if(err) {
            console.log(err);
            res.send( {
                "message": "error"
            })
        } else {
            console.log(result);
            res.send({
                "message": "success",
                "data": result
            })
        }
    });
});

router.get('*', (req, res) => {
    res.sendFile('index.html', {root});
});

module.exports = router;