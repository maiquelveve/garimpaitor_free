module.exports = {
    Query: {
        async getAllBrands(_, __, { dataSources }) {
            return await dataSources.brandController.getAllBrands();
        },

        async getBrandId(_, { id }, { dataSources }) {
            return await dataSources.brandController.getBrandId(id);
        },

        async getBrandName(_, { name }, { dataSources }) {
            return await dataSources.brandController.getBrandName(name);
        },

        async getForNetwork(_, { network_id }, { dataSources }) {
            return await dataSources.brandController.getForNetwork(network_id);
        }
    },

    Mutation: {
        async createBrand(_, { data }, { dataSources, authUser }) {
            await authUser();
            return await dataSources.brandController.createBrand(data);
        },

        /****** ONLY ROOT HAS ACCESS *******/
        async updateBrand(_, { id, data }, { dataSources, authUser }) {
            await authUser(_, true);
            return await dataSources.brandController.updateBrand(id, data);
        },

        async activateBrand(_, { id }, { dataSources, authUser }) {
            await authUser(_, true);
            return await dataSources.brandController.activateBrand(id);
        },

        async disableBrand(_, { id }, { dataSources, authUser }) {
            await authUser(_, true);
            return await dataSources.brandController.disableBrand(id);
        },

        async verifyBrand(_, { id }, { dataSources, authUser }) {
            await authUser(_, true);
            return await dataSources.brandController.verifyBrand(id);
        },

        async createBrandSystem(_, { data }, { dataSources, authUser }) {
            await authUser(_, true);
            return await dataSources.brandController.createBrandSystem(data);
        },
    }
}
