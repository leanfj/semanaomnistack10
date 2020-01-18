const axios = require('axios');
const developer = require('../models/developer');
const asStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
  async index(req, res, next) {
    const developers = await developer.find({});
    return res.json(developers);
  },
  async store(req, res, next) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dataBaseResponse = await developer.findOne({ github_username });

    if (!dataBaseResponse) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = response.data;

      const techsArray = asStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };

      dataBaseResponse = await developer.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      sendMessage(sendSocketMessageTo, 'new-dev', dataBaseResponse);
    }

    return res.json(dataBaseResponse);
  }
};
