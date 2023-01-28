const Marketplace = require('../app/models/Marketplace');
const ErrorsForms = require('../app/errors/ErrorsForms');
const ErrorCnpj = require('../app/errors/ErrorCnpj');
const ErrorsRegisteredCnpj = require('../app/errors/ErrorsRegisteredCnpj');
const ErrorMarketplaceNotExist = require('../app/errors/ErrorMarketplaceNotExist');
const { stringValidator, NumberValidator, cnpjValidator } = require('../helpers/validationsHelpers');

const createMaretplaceValidations = async marketplace => {
    if (!marketplaceDefaultValidations(marketplace)) {
        throw new ErrorsForms();
    }

    if (!cnpjValidator(marketplace.cnpj)) {
        throw new ErrorCnpj();
    }

    if (await Marketplace.findOne({ where: { cnpj: marketplace.cnpj } })) {
        throw new ErrorsRegisteredCnpj();
    }

    return true;
}

const updateMaretplaceValidations = async (marketplace, id) => {
    if (!marketplaceDefaultValidations(marketplace)) {
        throw new ErrorsForms();
    }

    if (!cnpjValidator(marketplace.cnpj)) {
        throw new ErrorCnpj();
    }

    const marketplaceDB = await Marketplace.findByPk(id);
    if (!marketplaceDB) {
        throw new ErrorMarketplaceNotExist();
    }

    if (marketplace.cnpj !== marketplaceDB.cnpj) {
        if (await Marketplace.findOne({ where: { cnpj: marketplace.cnpj } })) {
            throw new ErrorsRegisteredCnpj();
        }
    }

    return true;
}

function marketplaceDefaultValidations(marketplace) {
    if (!stringValidator(marketplace.cnpj, min = 14, max = 14, isNull = false)) {
        return false
    }

    if (!stringValidator(marketplace.street, min = 1, max = 50, isNull = false)) {
        return false
    }

    if (!stringValidator(marketplace.number, min = 2, max = 50, isNull = false)) {
        return false
    }

    if (!stringValidator(marketplace.complement, min = 3, max = 150, isNull = true)) {
        return false
    }

    if (!stringValidator(marketplace.cep, min = 8, max = 8, isNull = false)) {
        return false
    }

    if (!stringValidator(marketplace.neighborhood, min = 3, max = 100, isNull = false)) {
        return false
    }

    if (!NumberValidator(marketplace.brand_id, min = 1, max = 9999, isNull = false)) {
        return false
    }

    if (!NumberValidator(marketplace.city_id, min = 1, max = 9999, isNull = false)) {
        return false
    }

    return true;
}

module.exports = { createMaretplaceValidations, updateMaretplaceValidations };
