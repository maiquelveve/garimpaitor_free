'use strict';
const networksBasic = require('../datas/networks_basic_json');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('networks', networksBasic)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('networks', null, {});
  }
};
