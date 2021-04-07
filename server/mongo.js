const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

module.exports = () => {
    mongoose.connect(MONGO_URI, {
        // 구버전 문제를 해결하기 위한 옵션정보 2개
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    })
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e));
}