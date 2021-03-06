# train-restroom-server
- Android: https://play.google.com/store/apps/details?id=com.yj.subway&hl=ko&gl=US
  IOS : https://apps.apple.com/kr/app/%EC%A7%80%ED%95%98%EC%B2%A0%ED%99%94%EC%9E%A5%EC%8B%A4/id1562567727
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
- moment
- moment-timezone
- jsonwebtoken
- cors

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
7. 2021/04/27
  - add, declare 스키마 생성
  - 라우터에 기능 연동, 입력된 정보를 DB에 저장하도록
8. 2021/05/03
  - 백오피스용 api 라우터 생성
  - 서버랑, 백오피스의 npm 폴더를 분리하는게 좋을까?
    ec2에서 해당 모듈을 함께 공유할텐데.. 그냥 깃폴더를 따로짜는게 나을것 같기도 하고..
9. 2021/05/04
  - mongoDB의 타임스탬프 시점을 한국 표준시 KST로 맞출 예정.
    moment-timezone 을 사용해서 처리함
  - schema 에 default 를 쓰면 자동처리된단 장점이 있긴한데,
    값이 없는 것도 기본값으로 채워서 반환해주는게 문제.
  - 해당 요청에 대한 처리여부는 단순히 bool값을 사용하는가?
    아니면 처리한 시간값을 기록하는 형태를 사용?
    ==> 일단 검색 필터링이 되게끔 수정
  - isClear는 default 값이 잘 들어가는데, isRead가 안들어감. 수정 필요
10. 2021/05/14
  - 필터링 기능까지 넣었는데, DB 컬럼이 갱신이 안되서 문제가 생기는 듯
    ==> 오탈자 문제였음
11. 2021/05/17
  - back-office 필터에 '페이지' 옵션 추가 ( 페이지 당, 15개의 정보 반환 )
  - 전체 페이지 수를 계산하여 함꼐 반환하도록 수정
  - 스키마 개선 ( isRaed, isClear ==> isRead 로 통합 )
12. 2021/05/18
  - userPhone (사용자 연락처) 정보도 받도록 스키마 추가
13. 2021/05/20
  - back-office 에서 jwt 값을 반환하도록 개선 시작 ( jsonwebtoken )
  - jwt 관련해서 기초작업은 끝내놓음 (jwt 부여, jwt 체크)
    추가적으로, 일정 시간 미만으로 남은 경우엔 jwt를 새로 갱신시키는 기능을 넣도록 해야함 OK
14. 2021/05/24
  - edit 기능 관련한 router 부분 작성
15. 2021/05/27
  - params 에서 body 로 값을 받도록 코드 개선
  - mongoDB 의 update 기능 작성 중
16. 2021/05/31
  - upsert를 사용해서 구현은 되었는데, 
    새로 생성되는 객체의 기본 id 값이 동일하다보니 upsert 가 원하는대로 작동이 안됨
    so, 절차를 2개로 나눠야할 것 같음
    ( 1차로, 존재하는지 탐색하고 업데이트 시도, 2차로 새로 값을 저장하도록 ) OK
  - 기존 값 업데이트 + 새 정보 추가 완료
17. 2021/06/07
  - cors 모듈로 문제 해결 시도

# 해야할 부분
- lnCd 도 함께 검색키로 받아오도록 수정 OK
- 데이터 필터링하기 ( 필요없는 노선은 제거하기 ) OK
- DB에 open api 값 저장시키기 OK
- 데이터 중복여부 확인해서 '공용'으로 바꿔서 전송 OK
- 신고기능 / 추가기능 OK
  ==> Post로 함수 수정, 이미지 참고해서 스키마 만들기
  ==> 신고: 역 이름 / 신고 정보 / 신고 내용
      추가: 역 이름 / 근처 출구 / 안,밖
- 데이터 확인과정 필요할 듯
- 백오피스 request 에 대해선 jwt 확인 절차가 필요함 OK
- isRead 또한 sort 기준으로 잡을 것인가??
- 삭제 여부도 고민해야 할 듯
  일반적으론 db에서 바로 삭제하는건 데이터 안전성떄문에 추천을 안하는 편이니까..

# 구현 TMI
- mongoDB 는 lean() 을 사용해야 빠른 탐색이 가능
  but, mongoose 는 이를 기본적으로 적용한 상태 ( 신경쓰지 않아도 됨 )
- mongoose.Query 중, count() 는 더 이상 추천하지 않음
  대신, countDocumnet() 라는 함수를 사용하길 권유
- Date 객체의 getTime() 은 second 단위의 값으로 반환
  Date.now() 는 milisecond 단위이므로, getTime() 결과에 1000을 곱해 단위를 맞춰줘야 함
- mongoose 에서 update / save 기능을 함께 쓰려면 { upsert: true } 로 설정하면 됨\

# 참고자료
- https://ryanwoo.tistory.com/6
- https://velog.io/@chy0428/web-nodejs-ec2%EC%97%90-%EC%84%A4%EC%B9%98%ED%95%98%EA%B8%B0-PM2%EB%A1%9C-%EA%B4%80%EB%A6%AC%ED%95%98%EA%B8%B0
- http://www.gisdeveloper.co.kr/?p=8987
- https://www.mongodb.com/blog/post/quick-start-nodejs--mongodb--how-to-implement-transactions
- https://velog.io/@moongq/mongoose-transaction
- https://flymogi.tistory.com/30
- https://mongoosejs.com/docs/api/query.html