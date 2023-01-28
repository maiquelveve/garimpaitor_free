'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('networks', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      verified: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('networks');
  }
};
