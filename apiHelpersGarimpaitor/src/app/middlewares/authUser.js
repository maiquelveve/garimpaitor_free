const { AUTH_ERROR_APP } = require('../../config/systemDefaultReturns/errors');
const { verifyToken } = require('../../helpers/tokenHelpers');

const authMiddlewares = (req, res, next) => {
    try {
        const token = req.headers.authtoken;
        if (!token) {
            return res.status(404).json(AUTH_ERROR_APP({ message: 'Token undefined.' }));
        }

        req.body.idUser = verifyToken(token);
        next();

    } catch (error) {
        return res.status(404).json(AUTH_ERROR_APP({ message: 'Token invalid.' }));
    }
}

module.exports = authMiddlewares;
