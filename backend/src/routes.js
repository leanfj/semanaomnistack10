const { Router } = require('express');
const axios = require('axios');
const developer = require('./models/developer');

const routes = Router();

routes.post('/developers', async (req, res, next) => {
  const { github_username, techs } = req.body;

  const response = await axios.get(
    `https://api.github.com/users/${github_username}`
  );

  const { name = login, avatar_url, bio } = response.data;

  const techsArray = techs.split(',').map(tech => tech.trim());

  const createResponse = await developer.create({
    github_username,
    name,
    avatar_url,
    bio,
    techs: techsArray
  });

  return res.json(createResponse);
});

module.exports = routes;
