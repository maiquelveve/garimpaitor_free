const ErrorFatal = require('../../app/errors/ErrorFatal');
const ErrorCnpj = require('../../app/errors/ErrorCnpj');
const ErrorLogin = require('../../app/errors/ErrorLogin');
const ErrorMarketplaceNotExist = require('../../app/errors/ErrorMarketplaceNotExist');
const ErrorsRegisteredMarketplaceUser = require('../../app/errors/ErrorsRegisteredMarketplaceUser')
const ErrorNotUser = require('../../app/errors/ErrorNotUser');
const ErrorUserNotAuthorized = require('../../app/errors/ErrorUserNotAuthorized');
const ErrorsForms = require('../../app/errors/ErrorsForms');
const ErrorsRegisteredCnpj = require('../../app/errors/ErrorsRegisteredCnpj');
const ErrorsRegisteredNetwork = require('../../app/errors/ErrorsRegisteredNetwork')
const ErrorsRegisteredEmail = require('../../app/errors/ErrorsRegisteredEmail');
const ErrorPassword = require('../../app/errors/ErrorPassword');
const ErrorNetworkNotExist = require('../../app/errors/ErrorNetworkNotExist');
const ErrorsRegisteredBrand = require('../../app/errors/ErrorsRegisteredBrand');
const ErrorsBrandDisabledNetwork = require('../../app/errors/ErrorsBrandDisabledNetwork');
const ErrorsMarketplaceDisabledBrand = require('../../app/errors/ErrorsMarketplaceDisabledBrand');

module.exports = error => {
    if (error.originalError instanceof ErrorCnpj) {
        return new Error(error.extensions.exception.description);
    }

    if (error.originalError instanceof ErrorLogin) {
        return new Error(error.extensions.exception.description);
    }

    if (error.originalError instanceof ErrorMarketplaceNotExist) {
        return new Error(error.extensions.exception.description);
    }

    if (error.originalError instanceof ErrorsRegisteredMarketplaceUser) {
        return new Error(error.extensions.exception.description);
    }

    if (error.originalError instanceof ErrorNotUser) {
        return new Error(error.extensions.exception.description);
    }

    if (error.originalError instanceof ErrorUserNotAuthorized) {
        return new Error(error.extensions.exception.description);
    }

    if (error.originalError instanceof ErrorsForms) {
        return new Error(error.extensions.exception.description);
    }

    if (error.originalError instanceof ErrorsRegisteredCnpj) {
        return new Error(error.extensions.exception.description);
    }

    if (error.originalError instanceof ErrorsRegisteredNetwork) {
        return new Error(error.extensions.exception.description);
    }

    if (error.originalError instanceof ErrorsRegisteredEmail) {
        return new Error(error.extensions.exception.description);
    }

    if (error.originalError instanceof ErrorPassword) {
        return new Error(error.extensions.exception.description);
    }

    if (error.originalError instanceof ErrorNetworkNotExist) {
        return new Error(error.extensions.exception.description);
    }

    if (error.originalError instanceof ErrorsRegisteredBrand) {
        return new Error(error.extensions.exception.description);
    }

    if (error.originalError instanceof ErrorsBrandDisabledNetwork) {
        return new Error(error.extensions.exception.description);
    }

    if (error.originalError instanceof ErrorsMarketplaceDisabledBrand) {
        return new Error(error.extensions.exception.description);
    }

    return new ErrorFatal(error);
}
