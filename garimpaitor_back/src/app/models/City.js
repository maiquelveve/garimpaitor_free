const { Sequelize, Model } = require('sequelize');

class City extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
            },
            {
                sequelize,
                modelName: 'City',
                tableName: 'citys',
            },
        )

        return this;
    }

    static associate(model) {
        this.belongsTo(model.State, { foreignKey: 'state_id', as: 'state' })
    }
}

module.exports = City;
