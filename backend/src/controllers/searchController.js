const developer = require('../models/developer');
const asStringAsArray = require('../utils/parseStringAsArray');

module.exports = {
  async index(req, res, next) {
    const { latitude, longitude, techs } = req.query;

    const techsArray = asStringAsArray(techs);

    const dataBaseResponse = await developer.find({
      techs: {
        $in: techsArray
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        }
      }
    });

    return res.json({ devs: dataBaseResponse });
  }
};
