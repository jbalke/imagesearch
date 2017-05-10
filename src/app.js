const app = require('express')();
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//var mongoURL = process.env.MONGOLAB_URI;
var mongoURL = 'localhost/imagesearch';

mongoose.connect(mongoURL);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database opened.')
});

var imageEntrySchema = mongoose.Schema({

});

imageEntrySchema.set('autoIndex', false);
var ImageEntry = mongoose.model('ImageEntry', imageEntrySchema);


app.get('/', (req, res) => {
    res.status(200).send('Image Search Abstractionb Layer Service');
});

module.exports.app = app;
module.exports.mongoose = mongoose;