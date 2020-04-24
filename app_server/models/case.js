const mongoose = require('mongoose');

let CaseSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    Date: String,  
    Province: String,
    Country: String,
    Confirmed: Number,
    Deaths: Number,
    Recovered: Number,
    Latitude: String,
    Longitude: String
});

module.exports = mongoose.model("Case", CaseSchema);