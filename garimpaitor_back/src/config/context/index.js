const User = require('../../app/models/User');
const ErrorUserNotAuthorized = require('../../app/errors/ErrorUserNotAuthorized');
const { verifyToken } = require('../../helpers/tokenHelpers');

module.exports = ({ req }) => {

    const userToken = req.headers.authtoken

    return {
        userToken,
        async authUser(id = null, isRoot = false) {
            try {
                if (!userToken) {
                    throw new Error('NOT TOKEN');
                }

                const user_id = verifyToken(userToken);
                if (id && id != user_id) {
                    throw new Error('TOKEN INVALID FOR USER')
                }

                if (isRoot) {
                    const userDB = await User.findByPk(user_id);
                    if (!userDB.status || !userDB.isRoot) {
                        throw new Error('USER IS NOT ROOT.')
                    }
                }

                return user_id;

            } catch (error) {
                throw new ErrorUserNotAuthorized();
            }
        }
    }
} 
