const express = require('express');
const router = express.Router();

// 몽고DB 스키마
const trainSchema = require('../schema/trainSchema');

// OPEN API 함수
const { getStationToilet } = require('../api/openApi');

// 모든 기차역 리스트 출력
router.get('/train-list', async (req, res) => {
    console.log('dataRouter /');
    try{
        const trains = await trainSchema.find({}).select("stinNm stinCd lnCd lnNm");
        
        // object id 값이 노출되어도 괜찮은가?
        return res.status(200).send(trains);
    }
    catch (e) {
        console.log("dataRouter /restroom error:", e);
        return res.status(500).send(e);
    }
});

router.get('/restroom/:stinCd', async (req, res) => {
    const { stinCd } = req.params; // 역 코드
    try {
        const { railOprIsttCd, lnCd } = await trainSchema.findOne({ stinCd });
        const restrooms = await getStationToilet(railOprIsttCd, lnCd, stinCd);
        return res.status(200).send(restrooms);
    }
    catch (e) {
        console.log("dataRouter /restroom error:", e);
        return res.status(500).send(e);
    }
});

module.exports = router;