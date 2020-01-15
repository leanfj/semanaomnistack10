const { Router } = require('express');
const devController = require('./controllers/developerController');
const routes = Router();

routes.get('/developers', devController.index);
routes.post('/developers', devController.store);

module.exports = routes;
