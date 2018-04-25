const express = require('express');
const router = express.Router();
const CachemanMongo = require('cacheman-mongo');

// Bring CachedData model
let CachedData = require('../models/cachedData');

let options = {
    collection: 'cache'
};

let cache = new CachemanMongo('mongodb://127.0.0.1:27017', options);

router.get('/', function (req, res) {
    cache.get(function (err, value) {
        if (err) throw err;
        console.log(value);
    }).then((value) => {
        if (!value) {
            res.status(404).send({message: "No key found."});
        } else res.status(200).status(value);
    });
});

module.exports = router;