const { Sequelize, Model } = require('sequelize');

class State extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                initial: Sequelize.STRING,
            },
            {
                sequelize,
                modelName: 'State',
                tableName: 'states',
            },
        )

        return this;
    }

    static associate(model) {
        this.belongsTo(model.Country, { foreignKey: 'country_id', as: 'country' })
    }
}

module.exports = State;
