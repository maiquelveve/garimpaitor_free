const User = require("../models/User");
const ErrorLogin = require("../errors/ErrorLogin");
const ErrorNotUser = require("../errors/ErrorNotUser");
const { createUserValidations, updateUserValidations, changePasswordValidations } = require("../../validations/usersValidations");
const { serializeString, serializePassword } = require("../../helpers/serializeHelpers");
const { encryptPassword, decryptPassword, passwordGenerator } = require("../../helpers/passwordHelpers");
const { generetorToken } = require("../../helpers/tokenHelpers");
const { operatorsSequelize } = require('../../helpers/databaseHelpers');

class UserController {
    async login(data) {
        try {
            const user = await User.findOne({ where: { email: data.email, status: true } });
            if (!user) {
                throw new ErrorLogin();
            }

            const verifyPassword = await decryptPassword(data.password, user.password);
            if (!verifyPassword) {
                throw new ErrorLogin();
            }

            const token = await generetorToken(user);
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                password: user.password,
                status: user.status,
                isRoot: user.isRoot,
                avatarLink: user.avatarLink,
                type: user.type,
                token,
            };

        } catch (error) {
            return error;
        }
    }

    async getUser(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new ErrorNotUser();
            }

            return user;

        } catch (error) {
            return error;
        }
    }

    async getUserByToken(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw new ErrorNotUser();
            }

            return user;

        } catch (error) {
            return error;
        }
    }

    async getAllUsers(data, user_id) {
        try {
            const { name } = data;
            let filter = { id: { [operatorsSequelize.ne]: user_id } };

            if (name) {
                filter = { ...filter, name: { [operatorsSequelize.like]: `%${name}%` } }
            }

            const users = await User.findAll({ where: filter });
            return users;

        } catch (error) {
            return error;
        }
    }

    async createUser(data) {
        try {
            const newUser = serealizeUsers(data);
            await createUserValidations(newUser);

            return await User.create({
                ...newUser,
                status: true,
                type: 'G',
                password: await encryptPassword(newUser.password)
            });

        } catch (error) {
            return error;
        }
    }

    async createUserTypeMarktplace(data) {
        try {
            const newUser = serealizeUsers(data);
            await createUserValidations(newUser);

            return await User.create({
                ...newUser,
                status: true,
                type: 'M',
                password: await encryptPassword(newUser.password)
            });

        } catch (error) {
            return error;
        }
    }

    async activateUser(id) {
        try {
            await User.update({ status: true }, { where: { id } });
            return true;

        } catch (error) {
            return error;
        }
    }

    async resetPassword(email) {
        try {
            const user = await User.findOne({ where: { email: email.trim().toUpperCase() } });
            if (user) {
                const newPassword = passwordGenerator();
                await User.update({ password: await encryptPassword(newPassword) }, { where: { id: user.id } });
                // AQUI ENVIA PARA O EMAIL A NOVA SENHA VIA MICROSERVICE DE ENVIO DE EMAIL QUE AINDA NÂO CRIEI
                console.log(newPassword)
            }

            return true;

        } catch (error) {
            return error;
        }
    }

    async updateUser(id, data) {
        try {
            const userDB = await User.findByPk(id);
            const { name, email } = data;
            const userData = serealizeUsers({ name, email, password: userDB.password });
            await updateUserValidations(userDB, userData);

            await User.update(userData, { where: { id } })
            return true;

        } catch (error) {
            return error;
        }
    }

    async disableUser(id) {
        try {
            await User.update({ status: false }, { where: { id } });
            return true;

        } catch (error) {
            return error;
        }
    }

    async changePassword(id, currentPassword, newPassword) {
        try {
            await changePasswordValidations(id, currentPassword, newPassword);
            await User.update({ password: await encryptPassword(newPassword) }, { where: { id } });
            return true;

        } catch (error) {
            return error;
        }
    }

    /****** ONLY ROOT HAS ACCESS *******/
    async changePermissionRoot(user_id, permission) {
        try {
            let isRoot;
            let type;
            switch (permission) {
                case "A":
                    isRoot = true;
                    type = "A"
                    break;
                case "M":
                    isRoot = false;
                    type = "M"
                    break;

                default:
                    isRoot = false;
                    type = "G"
            }

            await User.update({ isRoot, type }, { where: { id: user_id } });
            return true;

        } catch (error) {
            return error;
        }
    }

    async disableUserRoot(user_id) {
        try {
            await User.update({ status: false }, { where: { id: user_id } });
            return true;

        } catch (error) {
            return error;
        }
    }

    async activateUserRoot(user_id) {
        try {
            await User.update({ status: true }, { where: { id: user_id } });
            return true;

        } catch (error) {
            return error;
        }
    }
}

function serealizeUsers(user) {
    return {
        name: serializeString(user.name),
        email: serializeString(user.email),
        password: serializePassword(user.password),
    }
}

module.exports = new UserController();
