const express = require('express');
const router = express.Router();

// 몽고 DB
const addSchema = require('../schema/addSchema');
const reportSchema = require('../schema/reportSchema');

// 추가하기 (신규 정보 추가)
router.post('/add', async (req ,res) => {
    // addSchema 가 쓰일 곳
    console.log('user action-add');
    const { stinNm, exitNo, gateInotDvNm, userPhone } = req.body;
    try {
        console.log(stinNm, exitNo, gateInotDvNm);

        await addSchema.create({
            stinNm, exitNo, gateInotDvNm, userPhone
        });
        return res.send('success add');
    } catch (e) {
        console.log('user action-add error', e);
        return res.status(500).end(e);
    }
});

// 신고하기 (잘못된 정보 수정)
router.post('/report', async (req, res) => {
    // reportSchema 가 쓰일 곳
    console.log('user action-report');
    const { stinNm, type, detail, userPhone } = req.body;

    try {
        console.log(stinNm, type, detail);
        await reportSchema.create({
            stinNm, type, detail, userPhone
        });
        return res.send('success report');
    } catch (e) {
        console.log('user action-report error', e);
        return res.status(500).end(e);
    }
});

module.exports = router;