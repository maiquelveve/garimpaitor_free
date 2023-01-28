const Brand = require('../app/models/Brand');
const Network = require('../app/models/Network');
const ErrorsForms = require('../app/errors/ErrorsForms');
const ErrorsRegisteredBrand = require('../app/errors/ErrorsRegisteredBrand');
const ErrorNetworkNotExist = require('../app/errors/ErrorNetworkNotExist');
const { stringValidator, NumberValidator } = require('../helpers/validationsHelpers');

const createBrandValidations = async brand => {
    if (!brandDefaultValidations(brand)) {
        throw new ErrorsForms();
    }

    if (!await Network.findByPk(brand.network_id)) {
        throw new ErrorNetworkNotExist();
    }

    if (await Brand.findOne({ where: { name: brand.name } })) {
        throw new ErrorsRegisteredBrand();
    }

    return true;
}

const updateBrandValidations = async (id, brand) => {
    if (!brandDefaultValidations(brand)) {
        throw new ErrorsForms();
    }

    if (!await Network.findByPk(brand.network_id)) {
        throw new ErrorNetworkNotExist();
    }

    const brandDB = await Brand.findByPk(id);
    if (brandDB.name !== brand.name) {
        if (await Brand.findOne({ where: { name: brand.name } })) {
            throw new ErrorsRegisteredBrand();
        }
    }

    return true;
}

function brandDefaultValidations(brand) {
    if (!stringValidator(brand.name, min = 3, max = 150, isNull = false)) {
        return false
    }

    if (!NumberValidator(brand.network_id, min = 1, max = 9999, isNull = false)) {
        return false
    }

    return true;
}

module.exports = { createBrandValidations, updateBrandValidations };
