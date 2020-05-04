const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenderSchema = new Schema({
    _id: mongoose.Types.ObjectId,
    Country: String,  
    Cases: Number,
    Male_Confirmed_Number:Number,
    Male_Confirmed: Number,
    Female_Confirmed: Number,
    Female_Confirmed_number: Number,
    Deaths: Number,
    Male_Deaths: Number,
    Male_Deaths_Number: Number,
    Female_Deaths: Number,
    Female_Deaths_Number: Number
});

// Export the model
module.exports = mongoose.model('ageschemas', GenderSchema);