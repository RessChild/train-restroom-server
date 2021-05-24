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
        lnCd: "1",
        lnNm: "1호선",
    },
    {
        lnCd: "2",
        lnNm: "2호선",
    },
    {
        lnCd: "3",
        lnNm: "3호선",
    },
    {
        lnCd: "4",
        lnNm: "4호선",
    },
    {
        lnCd: "5",
        lnNm: "5호선",
    },
    {
        lnCd: "6",
        lnNm: "6호선",
    },
    {
        lnCd: "7",
        lnNm: "7호선",
    },
    {
        lnCd: "8",
        lnNm: "8호선",
    },
    {
        lnCd: "9",
        lnNm: "9호선",
    },
    {
        lnCd: "I1",
        lnNm: "인천1호선",        
    },
    {
        lnCd: "I2",
        lnNm: "인천2호선",        
    },
    {
        lnCd: "K1",
        lnNm: "수인분당선",        
    },
    {
        lnCd: "K2",
        lnNm: "경춘선",        
    },
    {
        lnCd: "K4",
        lnNm: "경의중앙",        
    },
    {
        lnCd: "K5",
        lnNm: "경강선",        
    },
    {
        lnCd: "A1",
        lnNm: "공항철도",        
    },
        {
        lnCd: "U1",
        lnNm: "의정부경전철",        
    },    {
        lnCd: "E1",
        lnNm: "용인경전철",        
    },
    {
        lnCd: "D1",
        lnNm: "신분당",        
    },
    {
        lnCd: "UI",
        lnNm: "우이신설경전철",        
    },
    {
        lnCd: "WS",
        lnNm: "서해선",        
    },
    {
        lnCd: "G1",
        lnNm: "김포도시철도",        
    }
]

module.exports = {
    railOprList, lnCdList, lnList
}