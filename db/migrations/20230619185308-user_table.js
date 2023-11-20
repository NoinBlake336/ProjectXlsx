'use strict';

const { DataTypes } = require('sequelize');
const { USER_TABLE } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface,Sequelize) {
    await queryInterface.createTable(USER_TABLE,{
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
    })
  },

  async down (queryInterface, Sequelize) {

  }
};
