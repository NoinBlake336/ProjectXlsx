const bcrypt = require('bcrypt');
const UserServices = require('./service');
const service = new UserServices();

class ControllerUser {
    async find(){
        const users = await service.getAll();
        return {users}
    }
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
        };

        if(password){
            const hash = await bcrypt.hash(password,10);
            newUser.password = hash;
        };

        const addUser = await service.addUser(newUser);

        return {addUser};
    };


    async update(id,change){
        const update = await service.updateUser(id,change);
        return {update};
    };



};


module.exports = ControllerUser;