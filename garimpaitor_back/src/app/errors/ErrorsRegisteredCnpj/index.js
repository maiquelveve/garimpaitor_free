class ErrorsRegisteredCnpj extends Error {

    constructor(message, ...args) {
        super(message, ...args)

        this.message = message
        this.name = 'ERROR_REGISTERED_CNPJ'
        this.code = 'CODE_ERROR_ERCNPJ'
        this.description = 'An error has occurred. CNPJ already registered.'
        this.description_pt = 'Ocorreu um erro. CNPJ já cadastrado.'
    }
}

module.exports = ErrorsRegisteredCnpj;
