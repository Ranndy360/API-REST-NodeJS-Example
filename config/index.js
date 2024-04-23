require("dotenv").config();

//Mapea todos los valores del env
const config = {
  dev: process.env.NODE_ENV !== "production",
  sentryDns: process.env.SENTRY_DNS,
  sentryId: process.env.SENTRY_ID,
  authAdminUsername: process.env.USER,
  authAdminPassword: process.env.PASSWORD,
  authJwtSecret: process.env.AUTH_JWT_SECRET,
  hotelApiKey: process.env.API_KEY,
  hotelXSignature: process.env.XSIGNATURE,
  portServer: process.env.SERVER_PORT
};

module.exports = { config };