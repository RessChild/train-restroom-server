// jwt 전용 함수
const jsonwebtoken = require('jsonwebtoken');

// 날짜 획득 함수
const getCurrentDate = require('./getCurrentDate');

// 고정 값
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // 계정 비밀번호
const TOKEN_PRIVATE_KEY = process.env.TOKEN_PRIVATE_KEY; // 비밀 키
const EXPIRES_IN = 60 * 60 * 24; // 만료 시간
// const EXPIRES_IN = 10; // 만료 시간

// jwt 생성 함수
const generateToken = (password) => {
    // 비밀번호가 다르면 실패
    if ( ADMIN_PASSWORD !== password ) return { login: false };

    // 맞은 경우, jwt 만들어서 반환
    const date = getCurrentDate();
    const jwt = jsonwebtoken.sign({ createdAt: date }, TOKEN_PRIVATE_KEY, { expiresIn: EXPIRES_IN });
    return { login: true, jwt };
};

// jwt 확인용 함수
const verityToken = (req, res, next) => {
    const { jwt } = req.body;
    // console.log(jwt);
    try {
        const result = jsonwebtoken.verify(jwt, TOKEN_PRIVATE_KEY);
        console.log(`verify`, result);
        next();
    } catch (e) {
        return res.status(401).send({ error: e });
    }
}

module.exports = {
    generateToken, verityToken 
};
