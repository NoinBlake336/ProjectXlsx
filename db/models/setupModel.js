const {USER_TABLE,User, UserSchema} = require('../models/user.model');
const { Product, ProductSchema, PRODUCTS_TABLE } = require('./product.model');

const setupModels = (sequelize)=>{
    User.init(UserSchema,{
        sequelize,
        tableName:USER_TABLE,
        modelName:'User',
        timestamps:false,
    });
    Product.init(ProductSchema,{
        sequelize,
        tableName:PRODUCTS_TABLE,
        modelName:'Product',
        timestamps:false,
    });

    // Associates
    Product.associate(sequelize.models);
    User.associate(sequelize.models);
};

module.exports = setupModels;