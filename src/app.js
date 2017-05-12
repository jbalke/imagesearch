const app = require('express')();
const mongoose = require('mongoose');
const searchApi = require('./api/search');

var mongoURL = process.env.MONGOLAB_URI;
//var mongoURL = 'localhost/imagesearch';

const db = openDatabase(mongoURL);

app.use('/api', searchApi);

app.get('/', (req, res) => {
    res.status(200).send('Image Search Abstractionb Layer Service');
});


function openDatabase(url) {
    mongoose.Promise = global.Promise;
    mongoose.connect(url);

    return mongoose.connection;
}

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database opened.')
});

module.exports.app = app;
module.exports.mongoose = mongoose;