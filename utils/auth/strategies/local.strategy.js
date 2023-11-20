const {Strategy}= require('passport-local');
const boom = require('@hapi/boom');

const bcrypt = require('bcrypt');
const UserServices = require('../../../services/user.service');

const service = new UserServices();

const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'},
    async(email,password,done)=>{
        try{
            const user = await service.findByEmail(email);
            if(!user){
                done(boom.unauthorized(),false);
            };
            const isMach = await bcrypt.compare(password,user.password);
            if(!isMach){
                done(boom.unauthorized(),false);
            };
            delete user.dataValues.password;
            done(null,user);
        }catch(err){
            done(err,false);
        };
    }
);

module.exports = LocalStrategy;
