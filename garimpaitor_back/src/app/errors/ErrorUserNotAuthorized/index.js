class ErrorUserNotAuthorized extends Error {
    constructor(message, ...args) {
        super(message, ...args)

        this.message = message
        this.name = 'ERROR_USER_NOT_AUTHORIZED'
        this.code = 'CODE_ERROR_EUNA'
        this.description = 'Unauthorized User'
        this.description_pt = 'Usuário não autorizado.'
    }
}

module.exports = ErrorUserNotAuthorized;
