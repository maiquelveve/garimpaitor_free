const Network = require('../app/models/Network');
const ErrorsForms = require('../app/errors/ErrorsForms');
const ErrorsRegisteredNetwork = require('../app/errors/ErrorsRegisteredNetwork');
const ErrorNetworkNotExist = require('../app/errors/ErrorNetworkNotExist');
const { stringValidator } = require('../helpers/validationsHelpers');

const createNetworkValidations = async network => {
    if (!networkDefaultValidations(network)) {
        throw new ErrorsForms();
    }

    if (await Network.findOne({ where: { name: network.name } })) {
        throw new ErrorsRegisteredNetwork();
    }

    return true;
}

const updateNetworkValidations = async (id, network) => {
    if (!networkDefaultValidations(network)) {
        throw new ErrorsForms();
    }

    const networkDB = await Network.findByPk(id);
    if (!networkDB) {
        throw new ErrorNetworkNotExist();
    }

    if (network.name !== networkDB.name) {
        if (await Network.findOne({ where: { name: network.name } })) {
            throw new ErrorsRegisteredNetwork();
        }
    }

    return true;
}

function networkDefaultValidations(network) {
    if (!stringValidator(network.name, min = 3, max = 150, isNull = false)) {
        return false
    }

    return true;
}

module.exports = { createNetworkValidations, updateNetworkValidations };
