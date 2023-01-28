const System = require("../models/System");
const { NOT_SYSTEM_TOKEN_ERROR, FATAL_ERROR_APP } = require("../../config/systemDefaultReturns/errors");

const authSystem = async (req, res, next) => {
    try {
        const systemToken = req.headers.authsystemtoken

        if (!systemToken) {
            return res.status(404).json(NOT_SYSTEM_TOKEN_ERROR({ message: 'NO API HELPERS ACCESS TOKEN' }));
        }

        const resultSystem = await System.findOne({ where: { apiHelpersToken: systemToken } });
        if (!resultSystem?.apiHelpersToken) {
            return res.status(404).json(NOT_SYSTEM_TOKEN_ERROR({ message: 'INVALID ACCESS TOKEN' }));
        }

        next();

    } catch (error) {
        return res.status(500).json(FATAL_ERROR_APP(error));
    }
}

module.exports = authSystem;
