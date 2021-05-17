const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// KST 얻는 함수
const getCurrentDate = require('../utils/getCurrentDate');

const addSchema = Schema({
    stinNm: String,
    exitNo: String,
    gateInotDvNm: String,
    createdAt: { type: String, default: getCurrentDate },
    isRead: { type: Boolean, default: false }, // 처리했는가?
});

module.exports = model('adds', addSchema)