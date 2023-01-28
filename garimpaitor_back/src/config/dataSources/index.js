const userController = require('../../app/controllers/userController');
const marketplaceController = require('../../app/controllers/marketplaceController');
const marketplaceUserController = require('../../app/controllers/marketplaceUserController');
const networkController = require('../../app/controllers/networkController');
const brandController = require('../../app/controllers/brandController');
const addressController = require('../../app/controllers/addressController');

module.exports = () => ({ userController, marketplaceController, marketplaceUserController, networkController, brandController, addressController });
