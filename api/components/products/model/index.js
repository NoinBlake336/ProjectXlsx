const {Schema,model} = require('mongoose');
const { transformObject } = require('../../../middleware/transform.object');


const productSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'UserModel',
        required:true,
    },
    product:{
        type:String,
    },
    price:{
        type:Number,
    }
});

productSchema.set('toJSON',{
    transform:transformObject.json,
});

const productModel = model('ProductModel',productSchema);

module.exports = productModel;
