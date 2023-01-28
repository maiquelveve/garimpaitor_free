const { Sequelize, Model } = require('sequelize');

class Marketplace extends Model {
    static init(sequelize) {
        super.init(
            {
                cnpj: Sequelize.STRING,
                street: Sequelize.STRING,
                number: Sequelize.STRING,
                neighborhood: Sequelize.STRING,
                cep: Sequelize.STRING,
                complement: Sequelize.STRING,
                status: Sequelize.BOOLEAN,
            },
            {
                sequelize,
                modelName: 'Marketplace',
                tableName: 'marketplaces',
            },
        )

        return this;
    }

    static associate(model) {
        this.belongsTo(model.City, { foreignKey: 'city_id', as: 'city' })
        this.belongsTo(model.Brand, { foreignKey: 'brand_id', as: 'brand' })
    }
}

module.exports = Marketplace;
