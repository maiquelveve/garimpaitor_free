class ErrorNetworkNotExist extends Error {

    constructor(message, ...args) {
        super(message, ...args)

        this.message = message
        this.name = 'ERROR_NETWORK_ID_INVALID'
        this.code = 'CODE_ERROR_NIDI'
        this.description = 'Invalid Network ID. Network Not Exist.'
        this.description_pt = 'ID da Rede de Mercados Inválido. Rede de Mercados não existe.'
    }
}

module.exports = ErrorNetworkNotExist;
