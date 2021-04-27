const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const addSchema = Schema({
    stinNm: String,
    exitNo: String,
    gateInotDvNm: String,
});

module.exports = model('adds', addSchema)