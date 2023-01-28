module.exports = {
    Query: {
        async getAllNetworks(_, __, { dataSources }) {
            return await dataSources.networkController.getAllNetworks();
        },

        async getNetworkId(_, { id }, { dataSources }) {
            return await dataSources.networkController.getNetworkId(id);
        },

        async getNetworkName(_, { name }, { dataSources }) {
            return await dataSources.networkController.getNetworkName(name);
        },
    },

    Mutation: {
        async createNetwork(_, { data }, { dataSources, authUser }) {
            await authUser();
            return await dataSources.networkController.createNetwork(data);
        },

        /****** ONLY ROOT HAS ACCESS *******/
        async updateNetwork(_, { id, data }, { dataSources, authUser }) {
            await authUser(_, true);
            return await dataSources.networkController.updateNetwork(id, data);
        },

        async activateNetwork(_, { id }, { dataSources, authUser }) {
            await authUser(_, true);
            return await dataSources.networkController.activateNetwork(id);
        },

        async disableNetwork(_, { id }, { dataSources, authUser }) {
            await authUser(_, true);
            return await dataSources.networkController.disableNetwork(id);
        },

        async verifyNetwork(_, { id }, { dataSources, authUser }) {
            await authUser(_, true);
            return await dataSources.networkController.verifyNetwork(id);
        },

        async createNetworkSystem(_, { data }, { dataSources, authUser }) {
            await authUser(_, true);
            return await dataSources.networkController.createNetworkSystem(data);
        },
    }
}
