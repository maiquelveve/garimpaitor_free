const { Sequelize, Model } = require('sequelize');

class MarketplaceUser extends Model {
    static init(sequelize) {
        super.init(
            {
                status: Sequelize.BOOLEAN,
            },
            {
                sequelize,
                modelName: 'MarketplaceUser',
                tableName: 'marketplaces_users',
            },
        )

        return this;
    }

    static associate(model) {
        this.belongsTo(model.City, { foreignKey: 'user_id', as: 'user' })
        this.belongsTo(model.Brand, { foreignKey: 'marketplace_id', as: 'marketplace' })
    }
}

module.exports = MarketplaceUser;
