const Brand = require('../models/Brand');
const Network = require('../models/Network');
const Marketplace = require('../models/Marketplace');
const MarketplaceUser = require('../models/MarketplaceUser');
const ErrorsBrandDisabledNetwork = require('../errors/ErrorsBrandDisabledNetwork');
const { serializeString, serializeInteger } = require("../../helpers/serializeHelpers");
const { createBrandValidations, updateBrandValidations } = require('../../validations/brandValidations');
const { operatorsSequelize, initialTransactionDB } = require('../../helpers/databaseHelpers');

class BrandController {
    async getAllBrands() {
        try {
            return await Brand.findAll({ where: { status: true }, include: [{ model: Network, as: 'network' }] });

        } catch (error) {
            return error;
        }
    }

    async getBrandId(id) {
        try {
            return await Brand.findByPk(id, { include: [{ model: Network, as: 'network' }] });;

        } catch (error) {
            return error;
        }
    }

    async getBrandName(name) {
        try {
            return await Brand.findAll({
                where: {
                    name: {
                        [operatorsSequelize.like]: `%${name}%`
                    }
                },
                include: [{ model: Network, as: 'network' }],
                order: [
                    ['id', 'DESC'],
                ],
            });
        } catch (error) {
            return error;
        }
    }

    async getForNetwork(network_id) {
        try {
            return await Brand.findAll({ where: { network_id }, include: [{ model: Network, as: 'network' }] });

        } catch (error) {
            return error;
        }
    }

    async createBrand(data) {
        try {
            const newBrand = serializeBrand(data);
            await createBrandValidations(newBrand);

            const network = await Network.findByPk(newBrand.network_id);
            const brand = await Brand.create({ ...newBrand, status: false, verified: false });

            return { ...brand.dataValues, network };

        } catch (error) {
            return error;
        }
    }

    /****** ONLY ROOT HAS ACCESS *******/
    async updateBrand(id, data) {
        try {
            const brand = serializeBrand(data);
            await updateBrandValidations(id, brand);

            await Brand.update(brand, { where: { id } });
            return await Brand.findByPk(id, { include: [{ model: Network, as: 'network' }] });



        } catch (error) {
            return error;
        }
    }

    async activateBrand(id) {
        try {
            const verifyNetworkDisable = await Brand.findByPk(
                id, 
                { 
                    include: [{ 
                        model: Network, as: 'network', 
                        where: { status: 0 } 
                    }] 
                }
            );
            
            if(verifyNetworkDisable) {
                throw new ErrorsBrandDisabledNetwork();
            }

            await Brand.update({ status: true, verified: true }, { where: { id } });
            return true;

        } catch (error) {
            return error;
        }
    }

    async disableBrand(id) {
        const transactionDB = await initialTransactionDB();
        try {
            const marketplaceId = (await Marketplace.findAll({ where: { status: true, brand_id: id }, transaction: transactionDB })).map(marketplace => marketplace.id);

            await Brand.update({ status: false }, { where: { id }, transaction: transactionDB });
            await Marketplace.update(
                { status: false },
                {
                    where: { brand_id: id },
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

            transactionDB.commit()
            return true;

        } catch (error) {
            transactionDB.rollback()
            return error;
        }
    }

    async verifyBrand(id) {
        try {
            await Brand.update({ status: true, verified: true }, { where: { id } });
            return true;

        } catch (error) {
            return error;
        }
    }

    async createBrandSystem(data) {
        try {
            const newBrand = serializeBrand(data);
            await createBrandValidations(newBrand);

            const network = await Network.findByPk(newBrand.network_id);
            const brand = await Brand.create({ ...newBrand, status: true, verified: true })

            return { ...brand.dataValues, network };

        } catch (error) {
            return error;
        }
    }
}

function serializeBrand(brand) {
    return {
        name: serializeString(brand.name),
        network_id: serializeInteger(brand.network_id),
    }
}

module.exports = new BrandController();
