const jwt = require('jsonwebtoken');
const authConfiguration = require('../config/authConfiguration');

const generetorToken = async user => {
    try {
        const { id } = user;

        const token = await jwt.sign(
            { id },
            authConfiguration.secret,
            {
                expiresIn: authConfiguration.expiresIn
            }
        )

        return token;

    } catch (error) {
        throw new Error(error);
    }
}

const verifyToken = token => {
    try {
        const { id } = jwt.verify(token, authConfiguration.secret);
        return id;

    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { generetorToken, verifyToken };