const State = require('../models/State');
const City = require('../models/City');

class AddressController {
    async getStates() {
        try {
            return await State.findAll();

        } catch (error) {
            return error;
        }
    }

    async getCitys(state_id) {
        try {
            return await City.findAll({ where: { state_id }, include: [{ model: State, as: 'state' }] });

        } catch (error) {
            return error;
        }
    }
}

module.exports = new AddressController();
