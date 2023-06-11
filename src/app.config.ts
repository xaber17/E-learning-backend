export default () => ({
  secretKey: process.env.SECRET_KEY,
  secretJwt: process.env.SECRET_JWT,
  expirationJwt: process.env.EXPIRATION_JWT,
  redisHost: process.env.REDIS_STORE,
  redisPort: Number(process.env.REDIS_PORT),
  swagger: process.env.SWAGGER,
});