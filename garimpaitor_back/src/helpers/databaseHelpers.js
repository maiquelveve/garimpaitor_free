const { Sequelize, Op } = require('sequelize');
const databaseConfig = require('../config/database');

const sequelize = new Sequelize(databaseConfig)
const operatorsSequelize = Op
const initialTransactionDB = async () => await sequelize.transaction()

module.exports = { initialTransactionDB, sequelize, operatorsSequelize }