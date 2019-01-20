const dotenv = require('dotenv')

dotenv.config()

const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || '4040',
  mongooseDebug: process.env.MONGOOSE_DEBUG,
  jwtSecret: process.env.JWT_SECRET,
  mongo: {
    host: process.env.MONGO_HOST || 'mongodb://localhost/tiny-coin',
    port: process.env.MONGO_PORT,
  },
}

module.exports = config
