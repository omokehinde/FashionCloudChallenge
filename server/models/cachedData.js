let mongoose = require('mongoose');

// Cached Data Schema
let cachedDataSchema = mongoose.Schema({
    key:{
        type: String,
        required: true
    },
    value:{
        type: String,
        required: true
    }
});

let CachedData = module.exports = mongoose.model('CachedData', cachedDataSchema);