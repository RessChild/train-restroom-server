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
4. 2021/04/12
  - open api 연동 완료
  - restful api 형태로 구축 완료
5. 2021/04/19
  - 일단은 노선코드도 함께 키값으로 쓰도록 수정은 함
    다만, 환승역은 개발로 출력해줘야하는게 문제
  - 서울 지하철 정보만 출력하도록 개편 완료 ( 717개의 노선정보만 반환함 )
  - open api 정보를 몽고db에 저장하는 단계 진행중 + 데이터 중복가공
    답이없으면 그냥 깡으로 진행할 예정
6. 2021/04/20
  - transaction 은 일단 사용 안하고 처리함
  - DB 에 open api 정보 전부 가공해서 넣음
  - 신고, 추가 기능용 라우터도 할당은 해놓은 상태 (/action/...).
    기능구현은 필요함.

# 해야할 부분
- lnCd 도 함께 검색키로 받아오도록 수정 OK
- 데이터 필터링하기 ( 필요없는 노선은 제거하기 ) OK
- DB에 open api 값 저장시키기 OK
- 데이터 중복여부 확인해서 '공용'으로 바꿔서 전송 OK
- 신고기능 / 추가기능

# 참고자료
- https://ryanwoo.tistory.com/6
- https://velog.io/@chy0428/web-nodejs-ec2%EC%97%90-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0-PM2%EB%A1%9C-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0
- http://www.gisdeveloper.co.kr/?p=8987
- https://www.mongodb.com/blog/post/quick-start-nodejs--mongodb--how-to-implement-transactions
- https://velog.io/@moongq/mongoose-transaction