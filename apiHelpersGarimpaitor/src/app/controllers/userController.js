const User = require("../models/User");
const { RETURN_DEFAULT_REGISTER_DB } = require("../../config/systemDefaultReturns/success");

class UserController {
    async getUser(req, res) {
        const { idUser } = req.body;

        const users = await User.findByPk(idUser);
        return res.status(200).json(RETURN_DEFAULT_REGISTER_DB(users));
    }
}

module.exports = new UserController();
