'use strict';
const brandsBasic = require('../datas/brands_basic_json');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('brands', brandsBasic)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('brands', null, {});
  }
};

