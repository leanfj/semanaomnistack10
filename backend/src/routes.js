const { Router } = require('express');
const devController = require('./controllers/developerController');
const routes = Router();

routes.post('/developers', devController.store);

module.exports = routes;
