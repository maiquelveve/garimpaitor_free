'use strict';
const states = require('../datas/states_json');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('states', states)
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('states', null, {});
  }
};
