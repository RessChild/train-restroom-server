// KST 출력 함수
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Seoul');

const getCurrentDate = () => {
    const date = moment().format('YYYY-MM-DD HH:mm:ss');
    return date;
};

module.exports = getCurrentDate;