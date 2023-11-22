require('dotenv').config();

const mongoose = require('mongoose');
const {config} = require('../../config');

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(config.uriDB,{
            dbName:'CasaPlus',
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('mongo database is connect!!');
        process.on('SIGINT', ()=>{
            mongoose.connection.close(()=>{
                console.log('Disconnection');
                process.exit(0);
            });
        });
    }catch(err){
        console.log(`Error: ${err}`);
        process.exit(1);
    };
};

module.exports = connectDB;