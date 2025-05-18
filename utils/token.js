const jwt = require('jsonwebtoken');

const generateAccessToken = (userInfo) => {
  return jwt.sign(
    userInfo, // 첫 번째 인자는 객체 형식으로 전달해야 한다
    process.env.ACCESS_KEY,
    {
      algorithm: 'HS256',
      expiresIn: '1d', // 유효기간
    }
  );
};

const generateRefreshToken = () => {
  return jwt.sign(
    {}, // refresh Token은 payload 사용하지 않는다.
    process.env.REFRESH_KEY,
    {
      algorithm: 'HS256',
      expiresIn: '7d',
    }
  );
};

const authenticateRefreshToken = async (token) => {
  try {
    const decodedToken = await jwt.verify(token, process.env.REFRESH_KEY);
    return decodedToken; // 유효성 인증에 성공하면 복호화된 토큰 데이터 반환
  } catch(err) {
    throw err;
  }
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  authenticateRefreshToken
};
