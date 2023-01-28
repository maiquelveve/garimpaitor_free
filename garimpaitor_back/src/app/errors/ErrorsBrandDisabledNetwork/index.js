class ErrorsBrandDisabledNetwork extends Error {

    constructor(message, ...args) {
        super(message, ...args)

        this.message = message
        this.name = 'ERROR_BRAND_DISABLED_NETWORK'
        this.code = 'CODE_ERROR_EDNBRAND'
        this.description = 'An error has occurred. Network disabled for brand.'
        this.description_pt = 'Ocorreu um erro. Rede desabilitada para marca.'
    }
}

module.exports = ErrorsBrandDisabledNetwork;
