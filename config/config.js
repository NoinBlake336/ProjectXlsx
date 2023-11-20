require('dotenv').config();

const config = {
    env:process.env.NODE_ENV || "dev",
    port:process.env.PORT || 3000,
    dbUser:process.env.DB_USER,
    dbHost:process.env.DB_HOST,
    dbPassword:process.env.DB_PASSWORD,
    dbPort:process.env.DB_PORT,
    dbName:process.env.DB_NAME,
    dbUri: process.env.DB_URI,
    jwtSecret:process.env.JWT_SECRET,
};


module.exports = {config};