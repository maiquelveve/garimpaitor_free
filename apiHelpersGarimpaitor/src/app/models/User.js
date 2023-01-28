const { Sequelize, Model } = require('sequelize');

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.STRING,
                avatarLink: Sequelize.STRING,
                status: Sequelize.BOOLEAN,
                isRoot: Sequelize.BOOLEAN,
                type: Sequelize.STRING,
            },
            {
                sequelize,
                modelName: 'User',
                tableName: 'users',
            },
        )

        return this;
    }
}

module.exports = User;
