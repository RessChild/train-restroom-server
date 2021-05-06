const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const addSchema = Schema({
    stinNm: String,
    exitNo: String,
    gateInotDvNm: String,
}, { timestamps: true });

module.exports = model('adds', addSchema)