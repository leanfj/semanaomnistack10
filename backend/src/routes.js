const { Router } = require('express');
const devController = require('./controllers/developerController');
const searchController = require('./controllers/searchController');
const routes = Router();

routes.get('/developers', devController.index);
routes.post('/developers', devController.store);

routes.get('/search', searchController.index);

module.exports = routes;
