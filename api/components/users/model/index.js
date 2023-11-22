const { Schema,model } = require('mongoose');
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
    products:[{
        type:Schema.Types.ObjectId,
        ref:'ProductModel',
    }]
});

UserSchema.set('toJSON',{
    transform:transformObject.json,
});

const userModel = model('UserModel',userModel);

module.exports = UserModel;