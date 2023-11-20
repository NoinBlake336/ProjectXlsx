const {Model,DataTypes,Sequelize} = require('sequelize');
const { USER_TABLE } = require('./user.model');
const PRODUCTS_TABLE = 'products';

const ProductSchema ={
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true,
    },
    product:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    price:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    userId:{
        type:Sequelize.INTEGER,
        allowNull:false,
        references:{
            model:USER_TABLE,
            key:'id',
        },
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
    },
    createAt:{
        type:DataTypes.DATE,
        allowNull:false,
        field:'create_at',
        defaultValue:Sequelize.NOW,
    }
};

class Product extends Model{
    static associate(models){
        this.belongsTo(models.User,{as:'user'});
    }
}



module.exports = {PRODUCTS_TABLE,ProductSchema,Product};