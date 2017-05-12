const mongoose = require('mongoose');

var searchLogSchema = mongoose.Schema({
    timestamp: {
        type: Number,
        index: true
    },
    query: String
});

var SearchLog = mongoose.model('SearchLog', searchLogSchema);

module.exports = SearchLog;