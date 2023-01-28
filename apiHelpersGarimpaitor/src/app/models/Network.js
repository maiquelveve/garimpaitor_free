const { Sequelize, Model } = require('sequelize');

class Network extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                status: Sequelize.BOOLEAN,
                verified: Sequelize.BOOLEAN,
            },
            {
                sequelize,
                modelName: 'Network',
                tableName: 'networks',
            },
        )

        return this;
    }
}

module.exports = Network;
