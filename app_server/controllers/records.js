
const Records= require('../models/case.js');


exports.test = function (req, res)
{
    res.send('Greetings from the assignment Test controller!');
};


exports.record_get = function (req, res) {
 
    Records.find({} ,{} ,function (err, data) {
        if (err) {
            console.log("Unable to get  details from the cluster");
            throw err;
        }

        else {
            console.log("Successfully retrieved  details from the cluster");
            console.log(data);
            res.send(data);
            }

    })
};