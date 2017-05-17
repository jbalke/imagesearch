const express = require('express');
const GoogleImages = require('google-images');
const SearchLog = require('../models/searchLog');

const client = new GoogleImages('014957081628100291121:ud1nhxsoenm', 'AIzaSyBaBZ3YO250H5Gvov-SBp_MZaeNwH8qlCc');

const searchApi = express.Router();

searchApi.get('/search/:query', (req, res) => {
    let query = req.params.query;
    let offset = req.params.offset || 10;
    let timestamp = Date.now();

    client.search(query, {page: offset})
        .then(results => {
            res.status(200).json(results);
        })
        .catch((error) => {
            res.status(500).json(error);
        });

    let queryLog = new SearchLog({ query, timestamp });
    queryLog.save();
});

searchApi.get('/latest', (req, res) => {
    SearchLog
        .find()
        .select({ _id: 0, query: 1, timestamp: 1 })
        .sort({ timestamp: -1 })
        .limit(10)
        .then(results => {
            res.status(200).json(results);
        });
});

//TODO: I can paginate through the responses by adding a ?offset=2 parameter to the URL.

module.exports = searchApi;