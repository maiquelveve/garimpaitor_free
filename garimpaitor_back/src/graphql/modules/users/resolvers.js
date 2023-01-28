module.exports = {
    Query: {
        async login(_, { data }, { dataSources }) {
            return await dataSources.userController.login(data);
        },

        async getUser(_, { id }, { dataSources, authUser }) {
            await authUser(id);
            return await dataSources.userController.getUser(id);
        },
        async getUserByToken(_, __, { dataSources, authUser }) {
            user_id = await authUser();
            return await dataSources.userController.getUserByToken(user_id);
        },

        /****** ONLY ROOT HAS ACCESS *******/
        async getAllUsers(_, { data }, { dataSources, authUser }) {
            const user_id = await authUser(_, true);
            return await dataSources.userController.getAllUsers(data, user_id);
        }
    },

    Mutation: {
        async createUser(_, { data }, { dataSources }) {
            return await dataSources.userController.createUser(data);
        },

        async createUserTypeMarktplace(_, { data }, { dataSources }) {
            return await dataSources.userController.createUserTypeMarktplace(data);
        },

        async activateUser(_, { id }, { dataSources, authUser }) {
            return await dataSources.userController.activateUser(id);
        },

        async resetPassword(_, { email }, { dataSources }) {
            return await dataSources.userController.resetPassword(email);
        },

        async updateUser(_, { id, data }, { dataSources, authUser }) {
            await authUser(id);
            return await dataSources.userController.updateUser(id, data);
        },

        async disableUser(_, { id }, { dataSources, authUser }) {
            await authUser(id);
            return await dataSources.userController.disableUser(id);
        },

        async changePassword(_, { id, currentPassword, newPassword }, { dataSources, authUser }) {
            await authUser(id);
            return await dataSources.userController.changePassword(id, currentPassword, newPassword);
        },

        /****** ONLY ROOT HAS ACCESS *******/
        async changePermissionRoot(_, { user_id, permission }, { dataSources, authUser }) {
            await authUser(_, true);
            return await dataSources.userController.changePermissionRoot(user_id, permission);
        },
        async disableUserRoot(_, { user_id }, { dataSources, authUser }) {
            await authUser(_, true);
            return await dataSources.userController.disableUserRoot(user_id);
        },
        async activateUserRoot(_, { user_id }, { dataSources, authUser }) {
            await authUser(_, true);
            return await dataSources.userController.activateUserRoot(user_id);
        },
    }
}
