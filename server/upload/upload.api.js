// 몽고DB 연결
const mongo = require('../mongo');
const mongoose = require('mongoose');

const restroomSchema = require('../schema/restroomSchema');
const trainSchema = require('../schema/trainSchema');

// open api 함수
const { getStationToilet } = require('../api/openApi');

// open api 연결
const apiUpload = async () => {
    await mongo();
    const trains = await trainSchema.find();
    trains.forEach( async ({ _id, railOprIsttCd, lnCd, stinCd }) => {
        // console.log(_id);
        const results = await getStationToilet(railOprIsttCd, lnCd, stinCd);
        
        // 배열값인지 검사
        if(Array.isArray(results)) {
            const restrooms = results.map(({ railOprIsttCd, lnCd, stinCd, ...others }) => others );

            // 분류하여 데이터 가공
            const boys = restrooms.filter( r => r.mlFmlDvNm === "남자");
            const girls = restrooms.filter( r => r.mlFmlDvNm === "여자");
            let totals = restrooms.filter( r => r.mlFmlDvNm !== "남자" && r.mlFmlDvNm !== "여자" );

            // 남자화장실 가공
            boys.forEach(({ mlFmlDvNm, ...b_others }) => { 
                // 모든 남자화장실과 위치가 겹치는 여자 화장실 체크
                const publics = girls.find(({ mlFmlDvNm, ...g_others}) => {
                    // 모든 키값 비교
                    let check = true;
                    for( key in b_others ) {
                        if( b_others[key] !== g_others[key] ) {
                            // 키값이 다르면 합치기 불가능
                            check = false;
                            break;
                        }
                    }
                    return check; // 동일한 위치에 있는가?
                });
                // 같은 위치에 있다면 공용화장실
                if( publics ) totals.push({ ...b_others, mlFmlDvNm: "공용" });
                else totals.push({ mlFmlDvNm, ...b_others });
            });

            // 여자화장실 가공
            girls.forEach(({ mlFmlDvNm, ...g_others }) => { 
                // 모든 남자화장실과 위치가 겹치는 여자 화장실 체크
                const publics = boys.find(({ mlFmlDvNm, ...b_others}) => {
                    // 모든 키값 비교
                    let check = true;
                    for( key in g_others ) {
                        if( g_others[key] !== b_others[key] ) {
                            // 키값이 다르면 합치기 불가능
                            check = false;
                            break;
                        }
                    }
                    return check; // 동일한 위치에 있는가?
                });
                // 같은 위치에 있다면 이전에 이미 정보를 넣었음
                if( !publics ) totals.push({ mlFmlDvNm, ...g_others });
            });

            // 트랜젝션 시작
            const session = await mongoose.startSession();
            try {
                session.startTransaction();

                // 전체 화장실 정보
                await restroomSchema.create(
                    totals.map(restroom => ({ ...restroom, station: _id })),
                    { session: session });

                await session.commitTransaction(); // 성공 시
            } catch (e) {
                console.log("commit error!", e, totals);
                await session.abortTransaction(); // 실패 시
            } finally {
                session.endSession(); // 끝내기
            }
        }
    });
}

apiUpload();