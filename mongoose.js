const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://shivang:6692934122@cluster0-xnffp.mongodb.net/test?retryWrites=true&w=majority", 
    { useNewUrlParser: true,
      useUnifiedTopology: true }, 
    (err) => {
        if(err) console.log(err);
        else console.log("Connected to MongoDB Atlas");
    });

module.exports = { mongoose };