'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('countries', [{
      name: "BRASIL",
      initial: "BR"
    }])
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('countries', null, {});
  }
};
