const User = require('../app/models/User');
const ErrorsForms = require('../app/errors/ErrorsForms');
const ErrorsRegisteredEmail = require('../app/errors/ErrorsRegisteredEmail');
const ErrorPassword = require("../app/errors/ErrorPassword");
const { decryptPassword } = require("../helpers/passwordHelpers");
const { stringValidator } = require('../helpers/validationsHelpers');

const createUserValidations = async user => {
    if (!userDefaultValidations(user)) {
        throw new ErrorsForms();
    }

    if (await User.findOne({ where: { email: user.email } })) {
        throw new ErrorsRegisteredEmail()
    }

    return true;
}

const updateUserValidations = async (userDB, userData) => {
    if (!userDefaultValidations(userData)) {
        throw new ErrorsForms();
    }

    const userVerifyEmail = await User.findOne({ where: { email: userData.email } });
    if (userVerifyEmail && userVerifyEmail.id !== userDB.id) {
        throw new ErrorsRegisteredEmail()
    }

    return true;
}

const changePasswordValidations = async (id, currentPassword, newPassword) => {
    const user = await User.findByPk(id);
    const verifyPassword = await decryptPassword(currentPassword, user.password);
    if (!verifyPassword) {
        throw new ErrorPassword();
    }

    if (!userChangePasswordValidations(newPassword)) {
        throw new ErrorsForms();
    }

    return true;
}

function userDefaultValidations(user) {
    if (!stringValidator(user.name, min = 3, max = 150, isNull = false)) {
        return false
    }

    if (!stringValidator(user.email, min = 8, max = 150, isNull = false)) {
        return false
    }

    if (!stringValidator(user.password, min = 6, max = 100, isNull = false)) {
        return false
    }

    return true;
}

function userChangePasswordValidations(password) {
    if (!stringValidator(password, min = 6, max = 100, isNull = false)) {
        return false
    }

    return true;
}

module.exports = { createUserValidations, updateUserValidations, changePasswordValidations };
