const express = require('express');
const router = express.Router();

// MongoDB 스키마
const addSchema = require('../schema/addSchema');
const reportSchema = require('../schema/reportSchema');

// 추가 요청 목록
router.post('/add-list', async (req, res) => {
    console.log('router add-list');

    // 검색 필터링
    const { isRead, isClear } = req.body;

    try {
        const add_list = await addSchema.find({ isRead, isClear }).sort({ "createdAt": -1 });
        return res.send(add_list);
    } catch (e) {
        return res.status(500).end();
    }
});

// 수정 요청 목록
router.post('/report-list', async (req, res) => {
    console.log('router report-list');

    // 검색 필터링
    const { isRead, isClear } = req.body;

    try {
        const report_list = await reportSchema.find({ isRead, isClear }).sort({ 'createdAt': -1 });
        return res.send(report_list);    
    } catch (e) {
        return res.status(500).end();
    }
});

module.exports = router;