const redis = require('redis');

const redisClient = redis.createClient({
  url: 'redis://localhost:6379'
});

// 에러 로그 출력
redisClient.on('error', (err) => {
  console.error('Redis Client Error:', err);
});

// 앱 종료 시 Redis 연결 종료
process.on('SIGINT', async () => {
  console.log('Gracefully shutting down Redis...');
  await redisClient.quit();
  process.exit();
});

redisClient.connect().catch(console.error);

module.exports = redisClient;
