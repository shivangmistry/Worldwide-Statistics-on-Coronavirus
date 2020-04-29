
const Records= require('../models/case.js');


exports.test = function (req, res)
{
    Records.aggregate([
        {
            $addFields: {
                TotalCases:
                    { $add: ["$Confirmed", "$Deaths", "$Recovered"] }
            }
        },
        {
            $group: {
                _id:
                    { "Date": "$Date" },
                totalConfirmedCases: { $sum: "$TotalCases" }
            }
        },
        {
            $sort: { _id: 1 }
        }

    ], (err, result) => {
        if(err) res.send("error")
        res.send(result);
    })
};


exports.record_get = function (req, res) {
    let returnObj = {};
    Records.aggregate([
        {
            $group: {
                _id:
                    { "Country": "$Country" },
                confirmed: { $sum: "$Confirmed" },
                
            }
        },
        {
            $sort: { confirmed: -1 }
        }
    ], (err0, result0) => {
        if(err0) res.send({"message": "error", "data":"Error loading global confirmed cases"});
        returnObj.confirmed = result0;
        Records.aggregate([
            {
                $group: {
                    _id:
                        { "Country": "$Country" },
                    deaths: { $sum: "$Deaths" },

                }
            },
            {
                $sort: { deaths: -1 }
            }
        ], (err1, result1) => {
            if (err1) res.send({ "message": "error", "data": "Error loading global death cases" });
            returnObj.deaths = result1;
            Records.aggregate([
                {
                    $group: {
                        _id:
                            { "Country": "$Country" },
                        recovered: { $sum: "$Recovered" },

                    }
                },
                {
                    $sort: { recovered: -1 }
                }
            ], (err2, result2) => {
                if (err2) res.send({ "message": "error", "data": "Error loading global recovered cases" });
                returnObj.recovered = result2;
                Records.aggregate([
                    {
                        $group: {
                            _id:
                                { "Date": "$Date" },
                            confirmed: { $sum: "$Confirmed" }
                        }
                    },
                    {
                        $sort: { _id: 1 }
                    }
                ], (err3, result3) => {
                    if (err3) res.send({ "message": "error", "data": "Error loading global daily confirmed cases" });
                    returnObj.dailyCases = result3;
                    Records.aggregate([
                        {
                            $group: {
                                _id:
                                {
                                    "Country": "$Country", "Province": "$Province", "Latitude": "$Latitude",
                                    "Longitude": "$Longitude"
                                },
                                confirmed: { $sum: "$Confirmed" },
                                deaths: { $sum: "$Deaths" },
                                recovered: { $sum: "$Recovered" },
                            }
                        }
                    ], (err4, result4) => {
                            if (err4) res.send({ "message": "error", "data": "Error loading global map data" })
                        returnObj.message = "success"
                        returnObj.geoLocation = result4;
                        res.send(returnObj);
                    })
                })
            });
        });
    });
};

exports.record_country_get = function(req, res) {
    let returnObj = {}
    const countryName = req.params.countryId;
    Records.aggregate([
        { $match: { Country: countryName } },
        {
            $group: {
                _id:
                    { "Country": "$Province" },
                confirmed: { $sum: "$Confirmed" },
            }
        },
        {
            $sort: { confirmed: -1 }
        }
    ], (err0, result0) => {
        if(err0) res.send({"message":"error", "data":"Error loading confirmed cases for country: " + countryName})
        returnObj.confirmed = result0;
        Records.aggregate([
            { $match: { Country: countryName } },
            {
                $group: {
                    _id:
                        { "Country": "$Province" },
                    deaths: { $sum: "$Deaths" },
                }
            },
            {
                $sort: { deaths: -1 }
            }
        ], (err1, result1) => {
            if (err1) res.send({ "message": "error", "data": "Error loading death cases for country: " + countryName })
            returnObj.deaths = result1;
            Records.aggregate([
                { $match: { Country: countryName } },
                {
                    $group: {
                        _id:
                            { "Country": "$Province" },
                        recovered: { $sum: "$Recovered" },
                    }
                },
                {
                    $sort: { recovered: -1 }
                }
            ], (err2, result2) => {
                if (err2) res.send({ "message": "error", "data": "Error loading recovered cases for country: " + countryName })
                returnObj.recovered = result2;
                Records.aggregate([
                    { $match: { Country: countryName } },
                    {
                        $group: {
                            _id:
                                { "Date": "$Date" },
                            confirmed: { $sum: "$Confirmed" }
                        }
                    },
                    {
                        $sort: { _id: 1 }
                    }
                ], (err3, result3) => {
                    if (err3) res.send({ "message": "error", "data": "Error loading daily cases for country: " + countryName })
                    returnObj.dailyCases = result3;
                    returnObj.message = "success";
                    res.send(returnObj);
                });
            });
        });
    });
}