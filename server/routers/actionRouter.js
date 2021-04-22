const express = require('express');
const router = express.Router();

// 추가하기 (신규 정보 추가)
router.put('/add', async () => {
    console.log('user action-add');
});

// 신고하기 (잘못된 정보 수정)
router.put('/report', async () => {
    console.log('user action-report');
});

module.exports = router;