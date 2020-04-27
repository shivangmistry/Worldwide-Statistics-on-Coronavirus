const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
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




// Export the model
module.exports = mongoose.model('records', RecordSchema);