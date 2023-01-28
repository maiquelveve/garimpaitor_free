class ErrorsRegisteredBrand extends Error {

    constructor(message, ...args) {
        super(message, ...args)

        this.message = message
        this.name = 'ERROR_REGISTERED_BRAND'
        this.code = 'CODE_ERROR_ERBRAND'
        this.description = 'An error has occurred. Brand already registered.'
        this.description_pt = 'Ocorreu um erro. Marca de Rede de Mercado já cadastrado.'
    }
}

module.exports = ErrorsRegisteredBrand;
