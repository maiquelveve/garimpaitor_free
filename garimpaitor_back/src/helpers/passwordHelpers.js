const bcrypt = require('bcrypt')

const encryptPassword = async password => {
    return await bcrypt.hash(password, 8);
}

const decryptPassword = async (passwordUser, passwordHash) => {
    return await bcrypt.compare(passwordUser, passwordHash);
}

const passwordGenerator = () => Math.random().toString(36).slice(-8)

module.exports = { encryptPassword, decryptPassword, passwordGenerator };
