'use strict';

const { CUSTOMER_TABLE } = require('../models/customer.model');
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      type: DataTypes.INTEGER,
      field: 'user_id',
      allowNull: false,
      unique: true,
    });
  },

  async down() {},

  /* async down(queryInterface) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  }, */
};
