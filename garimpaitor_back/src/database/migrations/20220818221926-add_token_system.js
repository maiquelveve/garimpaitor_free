'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('systems', [{
      api_helpers_token: "123456",
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('systems', null, {});
  }
};
