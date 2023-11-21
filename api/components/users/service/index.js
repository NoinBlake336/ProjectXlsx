const boom = require('@hapi/boom');
const Model = require('../model');

class userServices {

    async addUser(user){
        const myUser = new Model(user);
        myUser.save();
        return myUser;
    };

    async getOneUser(id){
        const user = await Model.findById(id);
        if(!user){
            throw boom.badRequest('Not user');
        }; 
        return user;
    };

    async updateUser(id,change){
        const updateuser = await Model.findOneAndUpdate(
            {_id:id},
            {
                name:change.name,
                email:change.email,
                password:change.password,
                date:new Date(),
            },
            {new:true}
        );
        return updateuser;
    };
};


module.exports = userServices;