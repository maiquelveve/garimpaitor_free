const { Router } = require('express');
const authMiddlewares = require('./app/middlewares/authUser');
const userController = require('./app/controllers/userController');

const routes = new Router();

routes.use(authMiddlewares);

routes.get('/', userController.getUser);

module.exports = routes
