const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// KST 얻는 함수
const getCurrentDate = require('../utils/getCurrentDate');

const reportSchema = Schema({
    stinNm: String,
    type: Number,
    detail: { type: String, default: '' },
    createdAt: { type: String, default: getCurrentDate },
    isRead: { type: Boolean, default: false }, // 읽었는가?
    isClear: { type: Boolean, default: false }, // 처리했는가?
});

module.exports = model('reports', reportSchema);