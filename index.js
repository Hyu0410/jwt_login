require('dotenv').config();

const express = require('express');
const app = express();
const db = require('./models'); //models/index.js에서 sequelize와 모델 불러오기
const PORT = process.env.PORT || 3000;

// DB 연결 및 서버 실행
db.sequelize
  .authenticate() // 1. DB 연결 확인
  .then(() => {
    console.log('db connection success...!');

    // 2. 테이블 동기화
    return db.sequelize.sync({
      // 필요에 따라 둘 중 하나 선택
      force: false, // true면 기존 테이블 삭제 후 재생성 (초기 개발 단계에서만)
      // alter: true, // 테이블 변경 사항 자동 반영 (사용시 주의)
    });
  })
  .then(() => {
    // 3. 서버 실행
    app.listen(PORT, () => {
      console.log(`Server listening on ${PORT}...!`);
    });
  })
  .catch(err => {
    console.error('db connection failed: ', err);
  });
