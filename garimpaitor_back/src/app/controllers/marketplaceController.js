const Marketplace = require('../models/Marketplace');
const MarketplaceUser = require('../models/MarketplaceUser');
const City = require('../models/City');
const State = require('../models/State');
const Country = require('../models/Country');
const Brand = require('../models/Brand');
const Network = require('../models/Network');
const ErrorsMarketplaceDisabledBrand = require('../errors/ErrorsMarketplaceDisabledBrand');
const { createMaretplaceValidations, updateMaretplaceValidations } = require('../../validations/marketplaceValidations');
const { serializeString, serializeInteger, serializeCnpj, serializeCep } = require("../../helpers/serializeHelpers");
const { sequelize, initialTransactionDB } = require('../../helpers/databaseHelpers');

class MarketplaceController {

    async getAllMarketplaces() {
        try {
            return await Marketplace.findAll({
                include: [
                    {
                        model: City,
                        as: 'city',
                        include: {
                            model: State,
                            as: 'state',
                            include: { model: Country, as: 'country' }
                        }
                    },
                    {
                        model: Brand,
                        as: 'brand',
                        include: {
                            model: Network,
                            as: 'network'
                        }
                    }
                ]
            })
        } catch (error) {
            return error;
        }
    }

    async getMarketplaceId(id, transactionCurrent = null) {
        try {
            return await Marketplace.findOne({
                where: { id },
                transaction: transactionCurrent,
                include: [
                    {
                        model: City,
                        as: 'city',
                        include: {
                            model: State,
                            as: 'state',
                            include: { model: Country, as: 'country' }
                        }
                    },
                    {
                        model: Brand,
                        as: 'brand',
                        include: {
                            model: Network,
                            as: 'network'
                        }
                    }
                ]
            })
        } catch (error) {
            return error;
        }
    }

    async getMarketplaceCnpj(cnpj, transactionCurrent = null) {
        try {
            return await Marketplace.findOne({
                where: { cnpj },
                transaction: transactionCurrent,
                include: [
                    {
                        model: City,
                        as: 'city',
                        include: {
                            model: State,
                            as: 'state',
                            include: { model: Country, as: 'country' }
                        }
                    },
                    {
                        model: Brand,
                        as: 'brand',
                        include: {
                            model: Network,
                            as: 'network'
                        }
                    }
                ]
            })
        } catch (error) {
            return error;
        }
    }

    async getMarketplaceFilters(brand, network, cnpj, city, user_id) {
        try {
            let whereCnpj = cnpj ? ` AND M.cnpj = "${cnpj}"` : '';
            let whereCity = city ? ` AND CI.name LIKE "%${city}%" ` : '';
            let whereBrand = brand ? ` AND BR.name LIKE "%${brand}%"` : '';
            let whereNetwork = network ? ` AND NE.name LIKE "%${network}%"` : '';

            const sql = `
                SELECT 
                    M.id, M.cnpj, M.street, M.number, M.neighborhood, M.cep, M.complement, M.status, M.city_id, M.brand_id, M.status,
                    CI.id as cityId, CI.name as cityName, CI.state_id, 
                    ST.id as stateId, ST.name stateName, ST.initial as stateInitial, ST.country_id,
                    CO.id as countryId, CO.name as countryName, CO.initial as countryInitial,
                    BR.id as brandId, BR.name as brandName, BR.status as brandStatus, BR.verified as brandVerified, BR.network_id,
                    NE.id as networkId, NE.name as networkName, NE.status as networkStatus, NE.verified as networkVerified,
                    IFNULL(
                        (SELECT true FROM marketplaces_users MU WHERE MU.marketplace_id = M.id and MU.user_id = ${user_id}), 
                        false
                    ) as isMyMarketplace,
                    (
                        SELECT MU.status FROM marketplaces_users MU WHERE MU.marketplace_id = M.id and MU.user_id = ${user_id}
                    ) as marketplaceUserStatus
                FROM marketplaces AS M 
                    LEFT OUTER JOIN citys AS CI ON M.city_id = CI.id 
                    LEFT OUTER JOIN states AS ST ON CI.state_id = ST.id 
                    LEFT OUTER JOIN countries AS CO ON ST.country_id = CO.id 
                    LEFT OUTER JOIN brands AS BR ON M.brand_id = BR.id 
                    LEFT OUTER JOIN networks AS NE ON BR.network_id = NE.id
                WHERE
                    ${'1 = 1'}
                    ${whereCnpj}
                    ${whereCity}
                    ${whereBrand}
                    ${whereNetwork}
                ORDER BY M.id DESC    
            `
            const dataMarketplaces = await sequelize.query(sql, { type: sequelize.QueryTypes.SELECT });
            return marketTypeConfig(dataMarketplaces);

        } catch (error) {
            return error;
        }
    }

    async createMarketplace(data, user_id) {
        const transactionDB = await initialTransactionDB();
        try {
            const newMarteplace = serealizeMarketplace(data);
            await createMaretplaceValidations(newMarteplace);

            const { id } = await Marketplace.create(newMarteplace, { transaction: transactionDB });
            await MarketplaceUser.create({ marketplace_id: id, user_id }, { transaction: transactionDB });

            const marketplaceCreated = await this.getMarketplaceId(id, transactionDB);

            transactionDB.commit();
            return marketplaceCreated;

        } catch (error) {
            transactionDB.rollback();
            return error;
        }
    }

    async updateMarketplace(id, data) {
        try {
            const marketplaceData = serealizeMarketplace(data);
            await updateMaretplaceValidations(marketplaceData, id);

            await Marketplace.update(marketplaceData, { where: { id } });

            return true;

        } catch (error) {
            return error;
        }
    }

    /****** ONLY ROOT HAS ACCESS *******/
    async createMarketplaceSystem(data) {
        const transactionDB = await initialTransactionDB();
        try {

            const newMarteplace = serealizeMarketplace(data);
            await createMaretplaceValidations(newMarteplace);

            const { id } = await Marketplace.create(newMarteplace, { transaction: transactionDB });
            const marketplaceCreated = await this.getMarketplaceId(id, transactionDB);

            transactionDB.commit();
            return marketplaceCreated;

        } catch (error) {
            transactionDB.rollback();
            return error;
        }
    }

    async disableMarketplaceSystem(id) {
        const transactionDB = await initialTransactionDB();
        try {
            await Marketplace.update({ status: false }, { where: { id } });
            await MarketplaceUser.update({ status: false }, { where: { marketplace_id: id } });

            transactionDB.commit();
            return true;

        } catch (error) {
            transactionDB.rollback();
            return error;
        }
    }

    async activateMarketplaceSystem(id) {
        const transactionDB = await initialTransactionDB();
        try {
            const verifyBrandDisable = await Marketplace.findByPk(
                id,
                {
                    include: [{
                        model: Brand, as: 'brand',
                        where: { status: 0 }
                    }]
                }
            );

            if (verifyBrandDisable) {
                throw new ErrorsMarketplaceDisabledBrand()
            }

            await Marketplace.update({ status: true }, { where: { id } });

            transactionDB.commit();
            return true;

        } catch (error) {
            transactionDB.rollback();
            return error;
        }
    }
}

function serealizeMarketplace(marketplace) {
    return {
        cnpj: serializeCnpj(marketplace.cnpj),
        street: serializeString(marketplace.street),
        number: serializeString(marketplace.number),
        neighborhood: serializeString(marketplace.neighborhood),
        city_id: serializeInteger(marketplace.city_id),
        complement: serializeString(marketplace.complement),
        cep: serializeCep(marketplace.cep),
        brand_id: serializeInteger(marketplace.brand_id),
    }
}

function marketTypeConfig(dataMarketplaces) {
    if (!dataMarketplaces.length) {
        return null;
    }

    return dataMarketplaces.map(dataMarketplace => ({
        id: dataMarketplace.id,
        cnpj: dataMarketplace.cnpj,
        status: dataMarketplace.status,
        street: dataMarketplace.street,
        number: dataMarketplace.number,
        neighborhood: dataMarketplace.neighborhood,
        cep: dataMarketplace.cep,
        complement: dataMarketplace.complement,
        isMyMarketplace: dataMarketplace.isMyMarketplace,
        marketplaceUserStatus: dataMarketplace.marketplaceUserStatus,
        city: {
            id: dataMarketplace.cityId,
            name: dataMarketplace.cityName,
            state: {
                id: dataMarketplace.stateId,
                name: dataMarketplace.stateName,
                initial: dataMarketplace.stateInitial,
                country: {
                    id: dataMarketplace.countryId,
                    name: dataMarketplace.countryName,
                    initial: dataMarketplace.countryInitial,
                }
            }
        },
        brand: {
            id: dataMarketplace.brandId,
            name: dataMarketplace.brandName,
            status: dataMarketplace.brandStatus,
            verified: dataMarketplace.brandVerified,
            network: {
                id: dataMarketplace.networkId,
                name: dataMarketplace.networkName,
                status: dataMarketplace.networkStatus,
                verified: dataMarketplace.networkVerified
            }
        }
    }))
}

module.exports = new MarketplaceController();
