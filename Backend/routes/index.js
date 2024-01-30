var express = require('express');
var router = express.Router();


const Trip = require('../models/trips');
const { checkBody } = require('../modules/checkBody');


/* GET home page. */

router.get('/trips', (req, res) => {
  let { departure, arrival, date } = req.body

  const startDate = date + 'T00:00:00.001+00:00';
  const endDate = date + 'T23:59:59.001+00:00';
  const regexDeparture = new RegExp(departure, 'i');
  const regexArrival = new RegExp(arrival, 'i');


  if (!checkBody(req.body, ["departure", "arrival", "date"])) {
    res.json({ error: 'Missing or empty fields' });
    return;
  } Trip.find({
    departure: regexDeparture,
    arrival: regexArrival,
    date: {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    }
  })
    .then(dbData => {

      if (dbData === null) {
        res.json({ result: false, error: 'Trip not found' })
      } else {

        res.json({ result: dbData });
      }
    });

});


// function ajouterAuPanier(){

// }
module.exports = router;
