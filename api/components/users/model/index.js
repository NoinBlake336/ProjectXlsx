const { Schema,model, SchemaType } = require('mongoose');
const { transformObject } = require('../../../middleware/transform.object');


const UserSchema = new Schema({
    name: {
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
});

UserSchema.set('toJSON',{
    transform:transformObject.json,
});

const userModel = model('UserModel',userModel);

module.exports = userModel;