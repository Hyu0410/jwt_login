'use strict'; // strict 모드 활성화

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
const db = {};

// sequelize 인스턴스를 생성해서 DB 연결을 초기화
const sequelize = config.use_env_variable // 로컬 아닌 배포 환경의 DB를 사용할 경우 config.js 에 use_env_variable 속성 추가
  ? new Sequelize(process.env[config.use_env_variable], config)
  : new Sequelize(config.database, config.username, config.password, config);

// models 내의 모든 .js 파일을 읽고 db 객체에 저장
fs
  .readdirSync(__dirname) 
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    // 기본 코드
    // const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);

    // 수정 코드(클래스 + init() 방식)
    const modelClass = require(path.join(__dirname, file));
    const model = modelClass.init(sequelize); // class 기반의 init 호출
    db[model.name] = model;
  });

// 각 모델에 정의된 associate() 메서드를 실행시켜 모델 간 관계를 연결
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
