const {Model,DataTypes,Sequelize} = require('sequelize');

const USER_TABLE = 'users';

const UserSchema = {
    id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true,
      },
      name:{
        type:DataTypes.STRING,
        allowNull:false,
      },
      email:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
      },
      password:{
        type:DataTypes.STRING,
        allowNull:false
      },
      createdAt:{
        allowNull:false,
        type:DataTypes.DATE,
        field:'created_at',
        defaultValue:Sequelize.NOW,
      }
}

class User extends Model{
    static associate(models){
        this.hasMany(models.Product,{as:'products',foreignKey:'userId'});
    };
};


module.exports = {USER_TABLE,UserSchema,User};