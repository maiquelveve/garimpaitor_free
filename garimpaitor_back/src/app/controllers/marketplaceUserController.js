const MarketplaceUser = require('../models/MarketplaceUser');
const { createMaretplaceUserValidations } = require('../../validations/marketplaceUserValidations');
const { serializeInteger } = require("../../helpers/serializeHelpers");

class MarketplaceUserController {
    async addMarketplaceUser(marketplace_id, user_id) {
        try {
            const newMarketplaceUser = serealizeMarketplaceUser({ marketplace_id, user_id });
            await createMaretplaceUserValidations(newMarketplaceUser);

            await MarketplaceUser.create(newMarketplaceUser);
            return true;

        } catch (error) {
            return error;
        }
    }

    async disableMarketplaceUser(id, user_id) {
        try {
            await MarketplaceUser.update({ status: false }, { where: { marketplace_id: id, user_id } });
            return true;

        } catch (error) {
            return error;
        }
    }

    async activateMarketplaceUser(id, user_id) {
        try {
            await MarketplaceUser.update({ status: true }, { where: { marketplace_id: id, user_id } });
            return true;

        } catch (error) {
            return error;
        }
    }
}

function serealizeMarketplaceUser(marketplaceUser) {
    return {
        marketplace_id: serializeInteger(marketplaceUser.marketplace_id),
        user_id: serializeInteger(marketplaceUser.user_id),
    }
}

module.exports = new MarketplaceUserController();
