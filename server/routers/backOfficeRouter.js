const express = require('express');
const router = express.Router();

// MongoDB 스키마
const addSchema = require('../schema/addSchema');
const reportSchema = require('../schema/reportSchema');

const LINE_LIMIT = 15;

/* 추가 요청 목록 기능 */
// 추가 리스트 반환
router.post('/add-list', async (req, res) => { 
    console.log('router add-list');

    // 검색 필터링
    const { isRead, page } = req.body;

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

    try {
        return res.send({ success: true });
    } catch (e) {
        return res.status(500).end();
    }
});


/* 수정 요청 목록 기능 */
// 수정 리스트 반환
router.post('/report-list', async (req, res) => {
    console.log('router report-list');

    // 검색 필터링
    const { isRead, page } = req.body;

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
        return res.send(report_list);    
    } catch (e) {
        return res.status(500).end();
    }
});

module.exports = router;