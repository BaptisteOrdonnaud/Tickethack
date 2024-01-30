var express = require('express');
var router = express.Router();

const Trip = require('../models/trips');
const { checkBody } = require('../modules/checkBody');


/* GET home page. */
router.get('/trips', (req, res) => {
  const { departure, arrival, date } = req.body


  if (!checkBody(req.body, ["departure", "arrival", "date"])) {
    res.json({ error: 'Missing or empty fields' });
    return;
  } Trip.findOne({ departure: departure, arrival: arrival, date: date }).then(dbData => {
    if (dbData === null) {
      res.json({ result: false, error: 'Trip not found' })
    } else {

      res.json({ result: dbData });
    }
  });

});

module.exports = router;
