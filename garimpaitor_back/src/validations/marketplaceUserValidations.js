const MarketplaceUser = require('../app/models/MarketplaceUser');
const ErrorsForms = require('../app/errors/ErrorsForms');
const ErrorsRegisteredMarketplaceUser = require('../app/errors/ErrorsRegisteredMarketplaceUser')
const { NumberValidator } = require('../helpers/validationsHelpers');

const createMaretplaceUserValidations = async marketplaceUser => {
    if (!marketplaceUserDefaultValidations(marketplaceUser)) {
        throw new ErrorsForms();
    }

    const { marketplace_id, user_id } = marketplaceUser;
    if (await MarketplaceUser.findOne({ where: { marketplace_id, user_id } })) {
        throw new ErrorsRegisteredMarketplaceUser();
    }

    return true;
}

function marketplaceUserDefaultValidations(marketplaceUser) {
    if (!NumberValidator(marketplaceUser.marketplace_id, min = 1, max = 9999, isNull = false)) {
        return false
    }

    if (!NumberValidator(marketplaceUser.user_id, min = 1, max = 9999, isNull = false)) {
        return false
    }

    return true;
}

module.exports = { createMaretplaceUserValidations };
