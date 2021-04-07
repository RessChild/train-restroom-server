# train-restroom-server
- 철도 화장실 정보 어플용 서버
- NodeJS / EC2 / S3 / MongoDB
- open api 서비스 키는 1년마다 재발급 받아야 함 
  https://data.kric.go.kr/rips/M_01_02/detail.do?id=186&service=convenientInfo&operation=stationToilet
  ( ~ 2022.04.05 까지 사용 가능 )

# npm 설치파일
- express
- axios
- dotenv
- mongoose
- aws-sdk
- nodemon
- mongoose
- pm2

# 진행사항
1. 2021/04/05
  - 환경세팅 준비
  - s3 연동, EC2 환경 구성
2. 2021/04/06
  - open api 키를 받아서 테스트 진행 중
    다만, 요청변수에 대한 정보가 부족해서 찾아보는 중 
    ( 역코드, 철도운영기관코드, ... )
  - 정보는 찾았는데, csv 파일로 제공되는 형태라 mongoDB 에 저장해서 쓰는 형태로 해야할 듯?
3. 2021/04/07
  - mongodb 연결
  - node-xlsx 모듈로 xlsx 파일을 읽어서 db에 저장
    ( https://data.kric.go.kr/rips/M_04_02/detail.do?id=2 에서 xlsx 파일 다운로드 가능 )
    이를 기반으로 open api를 사용할 수 있도록 마무리할 것

# 참고자료
- https://ryanwoo.tistory.com/6
- https://velog.io/@chy0428/web-nodejs-ec2%EC%97%90-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0-PM2%EB%A1%9C-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0
- http://www.gisdeveloper.co.kr/?p=8987