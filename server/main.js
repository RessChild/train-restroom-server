// 메인 서버
require('dotenv').config();

const express = require('express');
const app = express();

// 몽고DB 연결
const mongo = require('./mongo'); 
mongo();

// 환경 변수
const PORT = process.env.SERVER_PORT;


// 테스트
const { s3Upload, s3GetObject } = require('./storage/s3');
const { getStationToilet } = require('./api/openApi');
const trainSchema = require('./schema/trainSchema');
app.get('/', async (req, res) => {
    // 테스트용
    // await s3Upload('abc');
    // await s3GetObject('abc');
    // getStationToilet(322);

    // const new_train = await trainSchema.create({
    //     stinNm: "test", // 역 이름
    //     stinCd: "123", // 역 코드
    //     lnCd: "1234", // 노선 코드
    //     lnNm: "wvs", // 노선 이름
    //     railOprIsttCd: "abf", // 철도운영기관 코드
    // });
    // const result = await new_train.save();


    console.log("success to get '/'");
    return res.status(200).send("success to get '/'");
});

// 라우팅
const textRouter = require('./routers/testRouter');
app.use('/test', textRouter);

// 실행
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});