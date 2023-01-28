const { Sequelize, Model } = require('sequelize');

class Country extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                initial: Sequelize.STRING,
            },
            {
                sequelize,
                modelName: 'Country',
                tableName: 'countries',
            },
        )

        return this;
    }
}

module.exports = Country;
