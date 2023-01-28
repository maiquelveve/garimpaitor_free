const { Sequelize, Model } = require('sequelize');

class System extends Model {
    static init(sequelize) {
        super.init(
            {
                apiHelpersToken: Sequelize.STRING,
            },
            {
                sequelize,
                modelName: 'System',
                tableName: 'systems',
            },
        )

        return this;
    }
}

module.exports = System;
