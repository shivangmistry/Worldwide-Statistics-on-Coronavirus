const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const index = require('./app_server/routes/index');

require('./mongoose');

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