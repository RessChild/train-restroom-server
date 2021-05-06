const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const reportSchema = Schema({
    stinNm: String,
    type: Number,
    detail: { type: String, default: '' }
}, { timestamps: true });

module.exports = model('reports', reportSchema);