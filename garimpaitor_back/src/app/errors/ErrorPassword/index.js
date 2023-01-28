class ErrorPassword extends Error {
    constructor(message, ...args) {
        super(message, ...args)

        this.message = message
        this.name = 'ERROR_PASSWORD'
        this.code = 'CODE_ERROR_EP'
        this.description = 'Incorrect password'
        this.description_pt = 'Senha incorreta.'
    }
}

module.exports = ErrorPassword;
