const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const reportSchema = Schema({
    stinNm: String,
    type: Number,
    detail: { type: String, default: '' }
});

module.exports = model('reports', reportSchema);