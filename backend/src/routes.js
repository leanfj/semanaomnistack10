const { Router } = require('express');
const axios = require('axios')

const routes = Router();

routes.post('/developers', (req, res, next) => {
    const { github_user } = req.body;

});


module.exports = routes;