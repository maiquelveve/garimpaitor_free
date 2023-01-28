const { Sequelize, Model } = require('sequelize');

class Brand extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                status: Sequelize.BOOLEAN,
                verified: Sequelize.BOOLEAN
            },
            {
                sequelize,
                modelName: 'Brand',
                tableName: 'brands',
            },
        )

        return this;
    }

    static associate(model) {
        this.belongsTo(model.Network, { foreignKey: 'network_id', as: 'network' })
    }
}

module.exports = Brand;
