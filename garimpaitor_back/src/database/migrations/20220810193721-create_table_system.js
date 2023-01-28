'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('systems', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      api_helpers_token: {
        type: Sequelize.STRING(200),
        allowNull: false
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('systems');
  }
};
