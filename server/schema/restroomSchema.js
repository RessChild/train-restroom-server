const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const restroomSchema = new Schema({
    station: {
        type: Schema.Types.ObjectId,
    },
    grndDvNm: String,
    stinFlor: Number,
    gateInotDvNm: String,
    exitNo: String,
    dtlLoc: String,
    mlFmlDvNm: String,
    toltNum: { type: Number, default: null },
    diapExchNum: { type: Number, default: null }
});

module.exports = model('restrooms', restroomSchema);