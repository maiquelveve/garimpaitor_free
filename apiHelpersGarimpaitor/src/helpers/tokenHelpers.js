const jwt = require('jsonwebtoken');
const authConfig = require('../config/authConfiguration');

const verifyToken = token => {
    try {
        const { id } = jwt.verify(token, authConfig.secret)
        return id

    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { verifyToken }