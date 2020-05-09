
const Records= require('../models/case.js');
const GenderCases= require('../models/GenderCases.js');


exports.test = function (req, res) {
    res.send("test is running");
};

exports.mapData_get = function(req, res) {
    const lastDate = "05-04-2020";
    Records.aggregate([
        { $match: { Date: lastDate } },
        {
            $group: {
                _id:
                    { Country: "$Country" },
                confirmed: { $sum: "$Confirmed" }
            }
        },
    ], (err, result) => {
        if(err) res.send({"message":"error", "data":"Error loading map data"});
        let arr = [["Country", "Confirmed"]];
        result.forEach((r) => {
            arr.push([r._id.Country, r.confirmed])
        })
        res.send({"message":"success", "data": arr});
    })
}

exports.record_get = function (req, res) {
    // const lastDate = "04-17-2020";
    const lastDate = "05-04-2020";
    let returnObj = {};
    Records.aggregate([
        { $match: { Date: lastDate } },
        {
            $group: {
                _id:
                    { Country: "$Country" },
                confirmed: { $sum: "$Confirmed" }
            }
        },
        {
            $sort: { confirmed: -1 }
        }
    ], (err0, result0) => {
        if(err0) res.send({"message": "error", "data":"Error loading global confirmed cases"});
        returnObj.confirmed = result0;
        Records.aggregate([
            { $match: { Date: lastDate } },
            {
                $group: {
                    _id:
                        { Country: "$Country" },
                    deaths: { $sum: "$Deaths" }
                }
            },
            {
                $sort: { deaths: -1 }
            }
        ], (err1, result1) => {
            if (err1) res.send({ "message": "error", "data": "Error loading global death cases" });
            returnObj.deaths = result1;
            Records.aggregate([
                { $match: { Date: lastDate } },
                {
                    $group: {
                        _id:
                            { Country: "$Country" },
                        recovered: { $sum: "$Recovered" }
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
                            confirmed: { $sum: "$Confirmed" },
                            deaths: { $sum: "$Deaths"},
                            recovered: { $sum: "$Recovered"}
                        }
                    },
                    {
                        $sort: { _id: 1 }
                    }
                ], (err3, result3) => {
                    if (err3) res.send({ "message": "error", "data": "Error loading global daily confirmed cases" });
                    returnObj.WorlddailyCases = result3;
                GenderCases.aggregate([
                        {$group: {
                            _id:
                            {},
                            Male_Confirmed_Number: { $sum: "$Male_Confirmed_Number" },
                            Female_Confirmed_number: { $sum: "$Female_Confirmed_number"},
                            Male_Deaths_Number: { $sum: "$Male_Deaths_Number"},
                            Female_Deaths_Number: { $sum: "$Female_Deaths_Number"}
                    }},
                        ], (err4, result4) => {
                            if (err4) res.send({ "message": "error", "data": "Error loading global gender confirmed and death cases" });
                            returnObj.WorldGenderCases = result4;  
                            returnObj.message = "success"
                            res.send(returnObj);
                        });
                });
            });
        });
    });
};

exports.record_country_get = function(req, res) {
    let returnObj = {}
    const countryName = req.params.countryId;
    // const lastDate = "04-17-2020";
    const lastDate = "05-04-2020";

    Records.aggregate([
        { $match: { Date: lastDate, Country: countryName } },
        {
            $group: {
                _id:
                    { "Country": "$Province" },
                confirmed: { $sum: "$Confirmed" }
            }
        },
        {
            $sort: { confirmed: -1 }
        }
    ], (err0, result0) => {
        if(err0) res.send({"message":"error", "data":"Error loading confirmed cases for country: " + countryName})
        returnObj.confirmed = result0;
        Records.aggregate([
            { $match: { Date: lastDate, Country: countryName } },
            {
                $group: {
                    _id:
                        { "Country": "$Province" },
                    deaths: { $sum: "$Deaths" }
                }
            },
            {
                $sort: { deaths: -1 }
            }
        ], (err1, result1) => {
            if (err1) res.send({ "message": "error", "data": "Error loading death cases for country: " + countryName })
            returnObj.deaths = result1;
            Records.aggregate([
                { $match: { Date: lastDate, Country: countryName } },
                {
                    $group: {
                        _id:
                            { "Country": "$Province" },
                        recovered: { $sum: "$Recovered" }
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
                            confirmed: { $sum: "$Confirmed" },
                            deaths: { $sum: "$Deaths" },
                            recovered: { $sum: "$Recovered" }
                        }
                    },
                    {
                        $sort: { _id: 1 }
                    }
                ], (err3, result3) => {
                    if (err3) res.send({ "message": "error", "data": "Error loading daily cases for country: " + countryName })
                    returnObj.dailyCases = result3;

                GenderCases.aggregate([
                    { $match: { Country: countryName } },
                        {$group: {
                        _id:
                        {},
                        Male_Confirmed_Number: { $sum: "$Male_Confirmed_Number" },
                        Female_Confirmed_number: { $sum: "$Female_Confirmed_number"},
                        Male_Deaths_Number: { $sum: "$Male_Deaths_Number"},
                        Female_Deaths_Number: { $sum: "$Female_Deaths_Number"}
                        }},
                    ], (err5, result5) => {
                    if (err5) res.send({ "message": "error", "data": "Error loading daily Gender cases for country: " + countryName })
                    returnObj.CountryGenderCases = result5;
                    returnObj.message = "success";
                    res.send(returnObj);
                    });
                });
            });
        });
    });
}