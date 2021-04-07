const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const trainSchema = new Schema({
    stinNm: String, // 역 이름
    stinCd: String, // 역 코드
    lnCd: String, // 노선 코드
    lnNm: String, // 노선 이름
    railOprIsttCd: String, // 철도운영기관 코드
});

module.exports = model('trains', trainSchema);