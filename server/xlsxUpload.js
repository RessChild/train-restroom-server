// 파일 읽기용
const fs = require('fs');
const xlsx = require('node-xlsx');

// MONGO_DB
const mongo = require('./mongo');
const trainSchema = require('./schema/trainSchema');

// xlsx 파일
const path = './xlsx.xlsx'

const xlsxUpload = async () => {
    await mongo();
    try {
        // 파일 존재여부 판단
        fs.exists(path, (exists) => {
            if (exists) {
                const obj = xlsx.parse(path);

                let { data } = obj[0]; // 1번 시트에서, data 내용만 추출
                data.shift(); // 최상단의 분류탭 제거
                // [ 'RAIL_OPR_ISTT_CD', 'RAIL_OPR_ISTT_NM', 'LN_CD', 'LN_NM', 'STIN_CD', 'STIN_NM' ] 순서로 저장되어 있음

                // console.log(data);
                const new_db_data = data.map( info => {
                    // 데이터 싹 골라내서 명칭 가공
                    const [ railOprIsttCd, _NM, lnCd, lnNm, stinCd, stinNm ] = info;
                    return { railOprIsttCd, lnCd, lnNm, stinCd, stinNm };
                });
                // console.log(new_db_data);

                // 각각에 대해 db에 값을 전달
                new_db_data.forEach( async db_data => {
                    const result = await trainSchema.create(db_data);
                    console.log('success to upload db:', result.stinNm);
                });
            }
        });
    } catch (err) {
        return Promise.reject(err);
    }
}

xlsxUpload();