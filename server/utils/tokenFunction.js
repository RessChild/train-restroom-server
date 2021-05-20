// jwt 전용 함수
const jsonwebtoken = require('jsonwebtoken');

// 날짜 획득 함수
const getCurrentDate = require('./getCurrentDate');

// 고정 값
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD; // 계정 비밀번호
const TOKEN_PRIVATE_KEY = process.env.TOKEN_PRIVATE_KEY; // 비밀 키
const EXPIRES_IN = 60 * 60 * 24; // 만료 시간
// const EXPIRES_IN = 10; // 만료 시간
const TOKEN_REFRESH_RATE = 3 / 4; // 토큰 재발급 시점

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
        // 토큰 생성 시점(iat) 기준으로 신규 토큰 발급 여부를 판단
        // 생성 시점을 기준으로, 만료기간의 일정 시점 전까진 토큰 갱신을 하지 않음
        // 또한, getTime() 의 반환값은 second 단위이므로, now()의 단위에 맞춰서 밀리세컨을 추가
        const { iat } = jsonwebtoken.verify(jwt, TOKEN_PRIVATE_KEY);
        const deadline = new Date(iat + EXPIRES_IN * TOKEN_REFRESH_RATE).getTime() * 1000;

        if( deadline < Date.now() ) { // 갱신 시점을 넘어선 상태면, 새 토큰을 발급해서 넘겨줌
            const date = getCurrentDate();
            req.new_token = jsonwebtoken.sign({ createdAt: date }, TOKEN_PRIVATE_KEY, { expiresIn: EXPIRES_IN });
        }
        next();
    } catch (e) {
        return res.status(401).send({ error: e });
    }
}

module.exports = {
    generateToken, verityToken 
};
