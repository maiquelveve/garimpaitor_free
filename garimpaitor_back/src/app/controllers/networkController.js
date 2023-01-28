const Network = require('../models/Network');
const Brand = require('../models/Brand');
const Marketplace = require('../models/Marketplace');
const MarketplaceUser = require('../models/MarketplaceUser');
const { serializeString } = require("../../helpers/serializeHelpers");
const { initialTransactionDB, operatorsSequelize } = require('../../helpers/databaseHelpers');
const { createNetworkValidations, updateNetworkValidations } = require('../../validations/networkValidations');

class NetworkController {

    async getAllNetworks() {
        try {
            return await Network.findAll({ where: { status: true }, });
        } catch (error) {
            return error;
        }
    }

    async getNetworkId(id) {
        try {
            return await Network.findByPk(id);
        } catch (error) {
            return error;
        }
    }

    async getNetworkName(name) {
        try {
            return await Network.findAll({
                where: {
                    name: {
                        [operatorsSequelize.like]: `%${name}%`
                    }
                },
                order: [
                    ['id', 'DESC'],
                ],
            });
        } catch (error) {
            return error;
        }
    }

    async createNetwork(data) {
        try {
            const newNetwork = serealizeNetwork(data);
            await createNetworkValidations(newNetwork);

            return await Network.create({ ...newNetwork, status: false, verified: false })

        } catch (error) {
            return error;
        }
    }

    /****** ONLY ROOT HAS ACCESS *******/
    async updateNetwork(id, data) {
        try {
            const networkData = serealizeNetwork(data);
            await updateNetworkValidations(id, networkData);
            await Network.update(networkData, { where: { id } });

            return await Network.findByPk(id);
        } catch (error) {
            return error;
        }
    }

    async activateNetwork(id) {
        try {
            await Network.update({ status: true, verified: true }, { where: { id } })
            return true;
        } catch (error) {
            return error;
        }
    }

    async disableNetwork(id) {
        const transactionDB = await initialTransactionDB();
        try {
            const brandsIds = (await Brand.findAll({ where: { status: true, network_id: id }, attributes: ['id'], transaction: transactionDB })).map(brand => brand.id);
            const marketplaceId = (await Marketplace.findAll({ where: { status: true, brand_id: { [operatorsSequelize.in]: brandsIds } }, transaction: transactionDB })).map(marketplace => marketplace.id);

            await Network.update({ status: false }, { where: { id }, transaction: transactionDB });
            await Brand.update({ status: false }, { where: { network_id: id }, transaction: transactionDB });
            await Marketplace.update(
                { status: false },
                {
                    where: { brand_id: { [operatorsSequelize.in]: brandsIds } },
                    transaction: transactionDB,
                }
            );
            await MarketplaceUser.update(
                { status: false },
                {
                    where: { marketplace_id: { [operatorsSequelize.in]: marketplaceId } },
                    transaction: transactionDB
                }
            );

            transactionDB.commit();
            return true;

        } catch (error) {
            transactionDB.rollback();
            return error;
        }
    }

    async verifyNetwork(id) {
        try {
            await Network.update({ verified: true, status: true }, { where: { id } })
            return true;
        } catch (error) {
            return error;
        }
    }

    async createNetworkSystem(data) {
        try {
            const newNetwork = serealizeNetwork(data);
            await createNetworkValidations(newNetwork);

            return await Network.create({ ...newNetwork, status: true, verified: true })

        } catch (error) {
            return error;
        }
    }
}

function serealizeNetwork(network) {
    return {
        name: serializeString(network.name),
    }
}

module.exports = new NetworkController();
