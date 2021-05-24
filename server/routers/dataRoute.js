const express = require('express');
const router = express.Router();

// 몽고DB 스키마
const trainSchema = require('../schema/trainSchema');
const restroomSchema = require('../schema/restroomSchema');

// OPEN API 함수
const { getStationToilet } = require('../api/openApi');

// 필터링 고정 변수
const { railOprList, lnCdList } = require('../utils/FilterData');

// 모든 기차역 리스트 출력
router.get('/train-list', async (req, res) => {
    console.log('dataRouter /train-list');
    try{
        // 서울시 내의 지하철 정보만 필터링하여 반환해줌
        const trains = await trainSchema
            .find({ railOprIsttCd: { "$in": railOprList }, lnCd: { "$in": lnCdList }})
            .select("stinNm stinCd lnCd lnNm")
            .sort("lnNm");
        
        // console.log(trains.length);
        // object id 값이 노출되어도 괜찮은가?
        return res.status(200).send(trains);
    }
    catch (e) {
        console.log("dataRouter /restroom error:", e);
        return res.status(500).send(e);
    }
});

// 특정 역의 화장실 정보 출력
router.get('/restroom/:lnCd/:stinCd', async (req, res) => {
    console.log('dataRouter /restroom');
    const { lnCd, stinCd } = req.params; // 역 코드
    try {
        const station = await trainSchema.findOne({ lnCd, stinCd });
        // console.log(station);

        // db 사용 버전
        const { _id } = station;
        const restrooms = await restroomSchema.find({ station: _id });

        // oepn api 사용 버전
        // const { railOprIsttCd } = station;
        // const restrooms = await getStationToilet(railOprIsttCd, lnCd, stinCd);

        return res.status(200).send(restrooms);
    }
    catch (e) {
        console.log("dataRouter /restroom error:", e);
        return res.status(500).send(e);
    }
});

module.exports = router;