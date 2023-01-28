class ErrorsRegisteredNetwork extends Error {

    constructor(message, ...args) {
        super(message, ...args)

        this.message = message
        this.name = 'ERROR_REGISTERED_NETWORK'
        this.code = 'CODE_ERROR_ERNETW'
        this.description = 'An error has occurred. Network already registered.'
        this.description_pt = 'Ocorreu um erro. Rede de Mercado já cadastrado.'
    }
}

module.exports = ErrorsRegisteredNetwork;
