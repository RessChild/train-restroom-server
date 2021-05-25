// 필터링 고정 변수
const railOprList = ["IC", "KR", "GM", "AR", "S1", "S5", "S9", "SW", "UI", "UL", "DX"]; // 관리기관 코드명
const lnCdList = [ // 노선 코드명
    "1", "2", "3", "4", "5", "6", "7", "8", "9", // 1~9호선
    "I1", "I2", "K1", "K2", "K4", "K5", // 인천노선, 수인분당선, 경춘선, 경의중앙, 경강선
    "A1", "U1", "E1", "D1", // 공항철도, 의정부경전철, 용인경전철, 신분당
    "UI", "WS", "G1", // 우이신설경전철, 서해선, 김포도시철도
];

const lnList = [
    {
        railOprIsttCd: "KR",
        lnCd: "1",
        lnNm: "1호선 (코레일)",
    },
    {
        railOprIsttCd: "S1",
        lnCd: "1",
        lnNm: "1호선 (구서울메트로)",
    },
    {
        railOprIsttCd: "S1",
        lnCd: "2",
        lnNm: "2호선",
    },
    {
        railOprIsttCd: "KR",
        lnCd: "3",
        lnNm: "3호선 (코레일)",
    },
    {
        railOprIsttCd: "S1",
        lnCd: "3",
        lnNm: "3호선 (구서울메트로)",
    },
    {
        railOprIsttCd: "KR",
        lnCd: "4",
        lnNm: "4호선 (코레일)",
    },
    {
        railOprIsttCd: "S1",
        lnCd: "4",
        lnNm: "4호선 (구서울메트로)",
    },
    {
        railOprIsttCd: "S5",
        lnCd: "5",
        lnNm: "5호선",
    },
    {
        railOprIsttCd: "S5",
        lnCd: "6",
        lnNm: "6호선",
    },
    {
        railOprIsttCd: "S5",
        lnCd: "7",
        lnNm: "7호선",
    },
    {
        railOprIsttCd: "S5",
        lnCd: "8",
        lnNm: "8호선",
    },
    {
        railOprIsttCd: "S9",
        lnCd: "9",
        lnNm: "9호선",
    },
    {
        railOprIsttCd: "IC",
        lnCd: "I1",
        lnNm: "인천1호선",        
    },
    {
        railOprIsttCd: "IC",
        lnCd: "I2",
        lnNm: "인천2호선",        
    },
    {
        railOprIsttCd: "KR",
        lnCd: "K1",
        lnNm: "수인분당선",        
    },
    {
        railOprIsttCd: "KR",
        lnCd: "K2",
        lnNm: "경춘선",        
    },
    {
        railOprIsttCd: "KR",
        lnCd: "K4",
        lnNm: "경의중앙선",        
    },
    {
        railOprIsttCd: "KR",
        lnCd: "K5",
        lnNm: "경강선",        
    },
    {
        railOprIsttCd: "AR",
        lnCd: "A1",
        lnNm: "공항철도",
    },
    {
        railOprIsttCd: "UL",
        lnCd: "U1",
        lnNm: "의정부경전철",        
    },
    {
        railOprIsttCd: "EV",
        lnCd: "E1",
        lnNm: "용인에버라인", // 용인경전철        
    },
    {
        railOprIsttCd: "DX",
        lnCd: "D1",
        lnNm: "신분당",        
    },
    {
        railOprIsttCd: "UI",
        lnCd: "UI",
        lnNm: "우이신설경전철",        
    },
    {
        railOprIsttCd: "SW",
        lnCd: "WS",
        lnNm: "서해선",        
    },
    {
        railOprIsttCd: "GM",
        lnCd: "G1",
        lnNm: "김포도시철도",        
    }
]

module.exports = {
    railOprList, lnCdList, lnList
}