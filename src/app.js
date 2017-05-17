const app = require('express')();
const mongoose = require('mongoose');
const searchApi = require('./api/search');

var mongoURL = process.env.MONGOLAB_URI;
//var mongoURL = 'localhost/imagesearch';

const db = openDatabase(mongoURL);

app.set('view engine', 'pug');
app.set('views', './views');

// Display Service How-To
app.get('/', (req, res) => {
    res.status(200).render('index', {
        title: 'Image Search Abstraction Layer',
        app: 'FreeCodeCamp Basejump: Image Search Abstraction Layer',
        usage: 'User Stories',
        userStory1: 'I can get the image URLs, alt text and page urls for a set of images relating to a given search string.',
        userStory2: 'I can paginate through the responses by adding a ?offset=2 parameter to the URL.',
        userStory3: 'I can get a list of the most recently submitted search strings.',
        section1: 'Search Example',
        content1: genFullUrl(req, "api/search/funny%20cats?offset=10"),
        section2: 'Will return image search metadata:',
        content2: '[{"type":"image/jpeg","width":1280,"height":720,"size":75446,"url":"http://s2.dmcdn.net/Ub1O8/1280x720-mCQ.jpg","thumbnail":{"url":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT08JNesP-YK8wcpj0VVuyPpxcY1Lv9VelCjhtZTxmudXdxKadERMW5ZIY","width":150,"height":84},"description":"FUNNY CATS VIDEOS - Video Dailymotion","parentPage":"http://www.dailymotion.com/video/x1d97q7_funny-cats-videos_animals"}]',
        section3: 'Latest Queries Example',
        content3: genFullUrl(req, "api/latest"),
        section4: 'Will return recent queries:',
        content4: '[{"query":"funny cats","timestamp":1495016475554},{"query":"birds","timestamp":1494586059459}]'
    });
});

app.use('/api', searchApi);

function openDatabase(url) {
    mongoose.Promise = global.Promise;
    mongoose.connect(url);

    return mongoose.connection;
}

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database opened.')
});

// Generate a URL with current server hostname.
function genFullUrl(req, url) {  
    return `${req.protocol}://${req.hostname}:${getPort()}/${url}`;
}

// Get node.js port.
function getPort() {  
    return process.env.PORT || 3000;
}

module.exports.app = app;
module.exports.mongoose = mongoose;