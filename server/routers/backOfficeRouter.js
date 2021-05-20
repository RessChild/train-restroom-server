const express = require('express');
const router = express.Router();

// MongoDB 스키마
const addSchema = require('../schema/addSchema');
const reportSchema = require('../schema/reportSchema');

// JWT 관련
const { generateToken, verityToken } = require('../utils/tokenFunction');

const LINE_LIMIT = 15;

// 로그인 (비밀번호 확인)
router.post('/', async (req, res) => {
    console.log('try login');

    // 비밀번호 값을 얻어서 결과를 반환
    const { pw } = req.body;
    const json = generateToken(pw);
    return res.send(json);
});

// 로그인 확인 페이지 외엔, 전부 jwt 여부를 확인해야 함 (미들웨어)
router.use('/', verityToken);

/* 추가 요청 목록 기능 */
// 추가 리스트 반환
router.post('/add-list', async (req, res) => { 
    console.log('router add-list');

    // 토큰 갱신 여부 & 검색 필터링
    const { new_token, body: { isRead, page }} = req;

    // 뛰어넘을 라인 수
    const LINE_SKIP = Math.max(0, page * LINE_LIMIT);

    // 탐색 쿼리
    let query = {}
    if( !isRead ) query = { ...query, isRead };

    try {
        // 전체 페이지 수 연산
        const page_cnt = await addSchema
            .find({ ...query })
            .countDocuments();
        const total_page = Math.max(0, Math.ceil(page_cnt / LINE_LIMIT) - 1);

        // 해당 번호의 페이지
        const add_list = await addSchema
            .find({ ...query })
            .sort({ "createdAt": -1 })
            .skip(LINE_SKIP)
            .limit(LINE_LIMIT);
        return res.send({
            new_token,
            addList: add_list,
            totalPage: total_page,
        });
    } catch (e) {
        return res.status(500).end();
    }
});

// 주어진 리스트의 isRead 상태 변경
router.post('/add-read', async (req, res) => {
    console.log('router add-read');

    // 토큰 갱신 여부, 리스트
    const { new_token, body: { list }} = req;

    try {
        const { ok, nModified } = await addSchema
            .updateMany({ "_id": { "$in": list }}, { "isRead": true });
        // console.log(result);
        return res.send({ new_token, ok, nModified });
    } catch (e) {
        return res.status(500).end();
    }
});

/* 수정 요청 목록 기능 */
// 수정 리스트 반환
router.post('/report-list', async (req, res) => {
    console.log('router report-list');

    // 토큰 갱신 여부 & 검색 필터링
    const { new_token, body: { isRead, page }} = req;

    // 뛰어넘을 라인 수
    const LINE_SKIP = Math.max(0, page * LINE_LIMIT);

    // 탐색 쿼리
    let query = {}
    if( !isRead ) query = { ...query, isRead };

    try {
        // 페이지 수 연산
        const page_cnt = await reportSchema
            .find({ ...query })
            .countDocuments();
        const total_page = Math.max(0, Math.ceil(page_cnt / LINE_LIMIT) - 1);

        // 해당 번호의 페이지
        const report_list = await reportSchema
            .find({ ...query })
            .sort({ 'createdAt': -1 })
            .skip(LINE_SKIP)
            .limit(LINE_LIMIT);
        return res.send({
            new_token,
            reportList: report_list,
            totalPage: total_page,
        });
    } catch (e) {
        return res.status(500).end();
    }
});

module.exports = router;