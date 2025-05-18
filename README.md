# jwt_login

Node.js JWT 토큰 방식 로그인

---

# Requirements
- Node.js
- Redis

# Notes
- `Node/express`와 `MySQL`을 사용합니다. `sequelize-cli` 모듈을 사용했으므로 별도로 DB를 생성할 필요는 없습니다.
- 프론트엔드 파일은 따로 구현되어 있지 않습니다. `HTTP` 환경에서 실행하려면 `./controller/authController.js`의 39번째 줄 `secure` 설정을 **false**로 변경하세요.
- 환경변수를 사용합니다. `.env` 파일을 생성하여 필요한 환경변수를 설정해야 합니다.
>**환경변수 목록**
- DB_USERNAME
- DB_PASSWORD
- DB_DATABASE
- DB_HOST=127.0.0.1
- ACCESS_KEY
- REFRESH_KEY
- REDIS_URL=redis://localhost:6379
