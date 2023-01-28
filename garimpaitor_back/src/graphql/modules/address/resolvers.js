module.exports = {
    Query: {
        async getStates(_, __, { dataSources }) {
            return await dataSources.addressController.getStates();
        },

        async getCitys(_, { state_id }, { dataSources }) {
            return await dataSources.addressController.getCitys(state_id);
        },
    },
}
