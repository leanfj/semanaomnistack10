const { Router } = require('express');

const routes = Router();

routes.get('/', (req, res, next) => {
    return res.json(req.query);
});


module.exports = routes;