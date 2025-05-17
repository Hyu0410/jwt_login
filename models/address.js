const Sequelize = require('sequelize');

module.exports = class Address extends Sequelize.Model {
  static init(sequelize) { // 필드 정의
    return super.init(
        {
            region: {
                type: Sequelize.STRING(15),
                allowNull: false
            },
            subRegion: {
                type: Sequelize.STRING(10)
            },
            street: {
                type: Sequelize.STRING(50)
            },
            deas: {
                type: Sequelize.STRING(50)
            },
            zonecode: {
                type: Sequelize.INTEGER
            }
    }, {
      sequelize,
      modelName: 'Address',
      tableName: 'address',
      timestamps: false, // createdAt, udaptedAt 자동 생성
      paranoid: false, // deletedAt 자동 생성
      underscored: true //카멜 형식으로 표기된 필드명을 스네이크 형식으로 변환
    });
  }

  static associate(db) { // 관계 정의
    // 따로 외래키를 지정하지 않으면 모델명 + PK 컬럼이 생성되어 자동으로 연결된다.
    // belongsTo: 1대1, N대1 관계
    // belongsToMany: N대M 관계 (두 모델 사이에 중간 테이블(조인 테이블, pivot table)이 있어야 함)
    db.Address.belongsTo(db.User, {
        foreignKey: 'user_id',
        // 기본적으로 참조 대상 모델의 PK를 참조
        // PK가 아닌 컬럼을 외래키로 참조하기 위해 targetKey 사용
        targetKey: 'userId'
    })
  }
};
