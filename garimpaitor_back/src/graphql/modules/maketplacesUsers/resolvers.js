module.exports = {
    Mutation: {
        async addMarketplaceUser(_, { data }, { dataSources, authUser }) {
            const { marketplace_id, user_id } = data;
            await authUser(user_id);
            return await dataSources.marketplaceUserController.addMarketplaceUser(marketplace_id, user_id);
        },

        async disableMarketplaceUser(_, { id }, { dataSources, authUser }) {
            const user_id = await authUser();
            return await dataSources.marketplaceUserController.disableMarketplaceUser(id, user_id);
        },

        async activateMarketplaceUser(_, { id }, { dataSources, authUser }) {
            const user_id = await authUser();
            return await dataSources.marketplaceUserController.activateMarketplaceUser(id, user_id);
        },
    }
}
