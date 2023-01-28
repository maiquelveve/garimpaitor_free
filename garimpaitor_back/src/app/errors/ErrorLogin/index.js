class ErrorLogin extends Error {
    constructor(message, ...args) {
        super(message, ...args)

        this.message = message
        this.name = 'ERROR_LOGIN'
        this.code = 'CODE_ERROR_EL'
        this.description = 'User or password is invalid'
        this.description_pt = 'Usuário ou Senha Invalidos'
    }
}

module.exports = ErrorLogin;
