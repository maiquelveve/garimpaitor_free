class ErrorsForms extends Error {

    constructor(message, ...args) {
        super(message, ...args)

        this.message = message
        this.name = 'ERROR_FORM'
        this.code = 'CODE_ERROR_EF'
        this.description = 'An error has occurred. Some information provided is not correct.'
        this.description_pt = 'Ocorreu um erro. Algum dado informado não está correto.'
    }
}

module.exports = ErrorsForms;
