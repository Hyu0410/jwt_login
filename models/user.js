const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) { // 필드 정의
    return super.init(
        {
            userId: {
                type: Sequelize.STRING, // 기본은 VARCHAR(255)
                allowNull: false,
                unique: true,
                primaryKey: true
            },
            password: {
                type: Sequelize.STRING(100), //varchar(100),
                allowNull:false
            },
            userName: {
                type: Sequelize.STRING(20),
                allowNull:false
            }
    }, {
      sequelize,
      modelName: 'User',
      tableName: 'user',
      timestamps: false, // createdAt, udaptedAt 자동 생성
      paranoid: false, // deletedAt 자동 생성
      underscored: true //카멜 형식으로 표기된 필드명을 스네이크 형식으로 변환
    });
  }

  static associate(db) { // 관계 정의
    // 따로 외래키를 지정하지 않으면 모델명 + PK 컬럼이 생성되어 자동으로 연결된다.
    db.User.hasMany(db.Address, {
        foreignKey: 'user_id',   // Address 테이블의 외래키 (DB 컬럼 기준)
        sourceKey: 'userId',    // User 모델의 JS 속성 이름 기준 (PK)
        as: 'userAddress' //alias (관계 별칭)
    })
  }
};

