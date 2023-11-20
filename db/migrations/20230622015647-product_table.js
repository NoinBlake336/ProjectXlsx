'use strict';

const { DataTypes } = require('sequelize');
const { PRODUCTS_TABLE } = require('../models/product.model');
const { USER_TABLE } = require('../models/user.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface,Sequelize) {
    await queryInterface.createTable(PRODUCTS_TABLE,{
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
    })
  },

  async down (queryInterface, Sequelize) {

  }
};