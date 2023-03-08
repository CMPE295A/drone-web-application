const config = {
    secretKey: process.env.JWT_SECRET,
    frontendURL: process.env.frontendURL || "http://localhost:4000",
    mongoDB: process.env.MONGODB_URL
};


module.exports = config;