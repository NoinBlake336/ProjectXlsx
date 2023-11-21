require('dotenv').config();
const config = {
    port:process.env.PORT || 3000,
    uriDB:"mongodb+srv://noinblake-336:Cp6JaLsAle6nAcnO@cluster0.xaxibxw.mongodb.net/?retryWrites=true",
    secretKey:"secretPageKeyJWT", 
};

module.exports = {config};