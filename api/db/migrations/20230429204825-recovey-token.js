'use strict';

const { USER_TABLE } = require('../models/user.model');
const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'recovery_token', {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'recovery_token',
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'recovery_token');
  },
};
