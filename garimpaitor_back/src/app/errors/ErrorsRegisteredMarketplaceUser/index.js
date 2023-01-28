class ErrorsRegisteredMarketplaceUser extends Error {

    constructor(message, ...args) {
        super(message, ...args)

        this.message = message
        this.name = 'ERROR_REGISTERED_MARKETPLACE_USER'
        this.code = 'CODE_ERROR_ERMU'
        this.description = 'An error has occurred. marketplace already registered for this user.'
        this.description_pt = 'Ocorreu um erro. Mercado já cadastrado para este usuário.'
    }
}

module.exports = ErrorsRegisteredMarketplaceUser;
