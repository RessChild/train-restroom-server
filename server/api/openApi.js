const axios = require('axios');

const FORMAT = `json` || 'xml'
const SERVICE_KEY = process.env.OPEN_API_SERVICE_KEY; // open api 서비스 키

// 역별 코드
const getStationCode = () => {

};

// 역별 화장실 정보
const getStationToilet = async (STATION_CODE) => {
    // Restful Api
    const url = `http://openapi.kric.go.kr/openapi/convenientInfo/stationToilet?serviceKey=${SERVICE_KEY}&format=${FORMAT}&railOprIsttCd=${'S1'}&lnCd=${3}&stinCd=${STATION_CODE}`;
    ''
    try { // async-await 를 사용하므로, 에러처리
        const { data: { header, body } } = await axios.get(url);

        if( header.resultCode !== "00" ) { // 서비스키 필터링
            console.log(header.resultMsg);
            return header.resultMsg;
        }
        console.log(body);
        return body;
    } catch (e) {
        console.log("getStationToilet error:", e);
        return e;
    }
};


module.exports = {
    getStationToilet
};