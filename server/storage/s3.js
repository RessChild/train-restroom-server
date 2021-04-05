// AWS S3 연동
const AWS = require('aws-sdk');

// 환경 변수
const REGION = process.env.AWS_REGION;
const BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const SECRET_KEY = process.env.AWS_SECRET_KEY;

// 객체 연결
const s3 = new AWS.S3({ region: REGION, accessKeyId: ACCESS_KEY, secretAccessKey: SECRET_KEY });

// param 생성
const generateParams = (path, filename, body) => ({
    "Bucket": BUCKET_NAME,
    "Key": `${path}/${filename}`,
    "Body": body,
});

// 파일 업로드
const s3Upload = async (filename) => {
    const params = generateParams('image', filename, 'testing');

    try {
        // 저장 위치 (Bucket), 파일명 (Key), 파일 정보 (Body)
        const result = await s3.upload(params).promise();
        console.log("success upload :", result.Location);
    } catch (e) {
        console.log("fail upload :", e);
    }
};

// 특정 객체 참조
const s3GetObject = async (filename) => {
    const params = generateParams('image', filename);

    try {
        // 저장 위치 (Bucket), 파일명 (Key)
        const data = await s3.getObject(params).promise();
        console.log("success getObject :", data.Body);
    } catch (e) {
        console.log("fail getObject :", e);
    }
};

// 모듈 반환
module.exports = {
    s3Upload, s3GetObject
};