class ErrorsMarketplaceDisabledBrand extends Error {

    constructor(message, ...args) {
        super(message, ...args)

        this.message = message
        this.name = 'ERROR_MARKETPLACE_DISABLED_BRAND'
        this.code = 'CODE_ERROR_EDBMARKETPLACE'
        this.description = 'An error has occurred. Mark disabled for market.'
        this.description_pt = 'Ocorreu um erro. Marca desabilitada para Mercado.'
    }
}

module.exports = ErrorsMarketplaceDisabledBrand;
