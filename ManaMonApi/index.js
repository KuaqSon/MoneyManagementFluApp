var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var mongoose = require('mongoose');
var configDb = require('./config/database');



mongoose.connect(configDb.database, { useNewUrlParser: true });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection: error!'));
db.once('open',() => {
    console.log("connected to mongodb");
})


var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json());


var sampleMoney = require('./router/sampleMoney');
var instaDownloader = require('./router/instaDownloader');


app.use('/sample-money', sampleMoney);
app.use('/insta', instaDownloader);



function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

var port = normalizePort(process.env.PORT || '3000');

var server = app.listen(port, function () {
    console.log('Sever started on port ' + port);
});