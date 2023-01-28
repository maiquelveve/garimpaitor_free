const { Sequelize } = require('sequelize');
const dataBaseConfig = require('../config/database');
const Brand = require('../app/models/Brand');
const City = require('../app/models/City');
const Country = require('../app/models/Country');
const Marketplace = require('../app/models/Marketplace');
const MarketplaceUser = require('../app/models/MarketplaceUser');
const Network = require('../app/models/Network');
const State = require('../app/models/State');
const System = require('../app/models/System');
const User = require('../app/models/User');

const models = [Brand, City, Country, Marketplace, MarketplaceUser, Network, State, System, User];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(dataBaseConfig);
        models.map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models))
    }
}

module.exports = new Database();
