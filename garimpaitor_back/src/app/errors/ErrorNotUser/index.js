class ErrorLogin extends Error {
    constructor(message, ...args) {
        super(message, ...args)

        this.message = message
        this.name = 'ERROR_NOT_USER'
        this.code = 'CODE_ERROR_ENU'
        this.description = 'User not found'
        this.description_pt = 'Usuário não encontrado.'
    }
}

module.exports = ErrorLogin;
