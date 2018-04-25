const express = require('express');
const router = express.Router();
const CachemanMongo = require('cacheman-mongo');
const uuidv4 = require('uuid/v4');

// Bring CachedData model
let CachedData = require('../models/cachedData');

let options = {
    collection: 'cache'
};

let cache = new CachemanMongo('mongodb://127.0.0.1:27017', options);

// get all keys
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

// get a key
router.get('/:keyId', (req, res) => {
    cache.get(req.params.keyId, function (err, value) {
        if (err) throw err;
        console.log(value);
    }).then((value) => {
        if (!value) {
            console.log('Cache miss');
            const rand = uuidv4();
            cache.set(req.params.keyId, rand, 3600, function (err, value) {
                if (err) throw err;
            }).then((rand) => {
                res.status(200).send(rand);
            });
        } else {
            console.log('Cache hit')
            CachedData.findOne(req.params.keyId, (err, cacheData) => {
                res.status(200).send(cacheData.value);
            });
            res.status(200).status(value);
        }
    });
});

router.post('/', (req, res) => {
    // The older collections of CachedData are overwritten because mongodb has a 
    // maximum size of 16MB
    const rand = uuidv4();
    cache.set(req.params.keyId, rand, 3600, function (err, value) {
        if (err) throw err;
    }).then((rand) => {
        res.status(200).send(rand);
    });
});

router.delete('/:key', (req, res) => {
    cache.del(req.params.key, function (err) {
        if (err) throw err;
        // key was deleted
    });
});

router.delete('/', (req, res) => {
    cache.clear(function (err) {
        if (err) throw err;
        // cache is now clear
    });
});


module.exports = router;