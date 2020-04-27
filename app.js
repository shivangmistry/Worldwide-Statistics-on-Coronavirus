const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const index = require('./app_server/routes/index.js');

//require('./mongoose');
const mongoose = require('mongoose');
let dev_db_url = 'mongodb+srv://shivang:6692934122@cluster0-xnffp.mongodb.net/test?retryWrites=true&w=majority';
const mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname + '/public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use('/', index);

app.listen(PORT, () => {
    console.log('Server listening on port: ' + PORT);
})


module.exports = app;