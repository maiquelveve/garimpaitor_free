class ErrorCnpj extends Error {

    constructor(message, ...args) {
        super(message, ...args)

        this.message = message
        this.name = 'ERROR_CNPJ_INVALID'
        this.code = 'CODE_ERROR_CI'
        this.description = 'Invalid CNPJ.'
        this.description_pt = 'CNPJ invalido.'
    }
}

module.exports = ErrorCnpj;
