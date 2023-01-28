class ErrorMarketplaceNotExist extends Error {

    constructor(message, ...args) {
        super(message, ...args)

        this.message = message
        this.name = 'ERROR_MARKETPLACE_ID_INVALID'
        this.code = 'CODE_ERROR_MIDI'
        this.description = 'Invalid Marketplace ID. Marketplace Not Exist.'
        this.description_pt = 'ID do Mercado Inválido. Mercado não existe.'
    }
}

module.exports = ErrorMarketplaceNotExist;
