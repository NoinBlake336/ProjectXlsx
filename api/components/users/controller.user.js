const bcrypt = require('bcrypt');
const UserServices = require('./service');
const service = new UserServices();

class Controlleruser {
    async findOne(id){
        const find = await service.getOneUser(id);
        return {find};
    };

    async create({name,email,password}){
        const newUser = {
            name:name,
            email:email,
            password:password,
            date: new Date()
        }
    }

};


module.exports = Controlleruser;