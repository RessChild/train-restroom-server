// 메인 서버
require('dotenv').config();

const express = require('express');
const app = express();

// 환경 변수
const PORT = process.env.SERVER_PORT;

// 몽고DB 연결
const mongo = require('./mongo'); 

// 서버 연결 함수
const connectServer = async () => {
    await mongo();

    // // 테스트
    // const { s3Upload, s3GetObject } = require('./storage/s3');
    // const { getStationToilet } = require('./api/openApi');
    // app.get('/', async (req, res) => {
    //     // 테스트용
    //     // await s3Upload('abc');
    //     // await s3GetObject('abc');
    //     // getStationToilet(322);

    //     console.log("success to get '/'");
    //     return res.status(200).send("success to get '/'");
    // });

    // 라우팅
    // const textRouter = require('./routers/testRouter');
    // app.use('/test', textRouter);

    // 기초 데이터 관련
    const dataRouter = require('./routers/dataRoute');
    app.use('/data', dataRouter);

    // 사용자 액션 관련
    const actionRouter = require('./routers/actionRouter');
    app.use('/action', actionRouter);

    // 실행
    app.listen(PORT, () => {
        console.log(`listening on ${PORT}`);
    });
}

connectServer();