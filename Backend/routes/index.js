var express = require('express');
var router = express.Router();

const Trip = require('../models/trips');

/* GET home page. */
router.get('/trips', (req, res) => {
  const { departure, arrival, date } = req.body
  const checkBody = (body, keys) => {
    for (let i = 0; i < keys.length; i++) {
      if (!body[keys[i]]) {
        return false
      }
    }
    return true
  };

  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }
  Trip.find().then(trips => {
    res.json({ trips });
  });
});

module.exports = router;
