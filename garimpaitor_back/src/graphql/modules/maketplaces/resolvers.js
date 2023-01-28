module.exports = {
    Query: {
        async getAllMarketplaces(_, __, { dataSources }) {
            return await dataSources.marketplaceController.getAllMarketplaces();
        },

        async getMarketplaceId(_, { id }, { dataSources }) {
            return await dataSources.marketplaceController.getMarketplaceId(id);
        },

        async getMarketplaceCnpj(_, { cnpj }, { dataSources }) {
            return await dataSources.marketplaceController.getMarketplaceCnpj(cnpj);
        },

        async getMarketplaceFilters(_, { brand, network, cnpj, city }, { dataSources, authUser }) {
            const user_id = await authUser();
            return await dataSources.marketplaceController.getMarketplaceFilters(brand, network, cnpj, city, user_id);
        },
    },

    Mutation: {
        async createMarketplace(_, { data }, { dataSources, authUser }) {
            const user_id = await authUser();
            return await dataSources.marketplaceController.createMarketplace(data, user_id);
        },

        async updateMarketplace(_, { id, data }, { dataSources, authUser }) {
            await authUser();
            return await dataSources.marketplaceController.updateMarketplace(id, data);
        },

        /****** ONLY ROOT HAS ACCESS *******/
        async createMarketplaceSystem(_, { data }, { dataSources, authUser }) {
            await authUser(_, true);
            return await dataSources.marketplaceController.createMarketplaceSystem(data);
        },

        async disableMarketplaceSystem(_, { id }, { dataSources, authUser }) {
            await authUser(_, true);
            return await dataSources.marketplaceController.disableMarketplaceSystem(id);
        },

        async activateMarketplaceSystem(_, { id }, { dataSources, authUser }) {
            await authUser(_, true);
            return await dataSources.marketplaceController.activateMarketplaceSystem(id);
        },
    }
}
