'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('marketplaces', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
      },
      cnpj: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      street: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      number: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      neighborhood: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      cep: {
        type: Sequelize.STRING(20),
        allowNull: false
      },
      complement: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },
      city_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'citys', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      brand_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'brands', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('marketplaces');
  }
};
