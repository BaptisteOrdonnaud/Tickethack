var express = require('express');
var router = express.Router();
const User = require('../models/users')

const idUser = '65b9273e625302934946df7d';


router.post('/addToCart', (req, res) => {
  let travelId = req.body.travelId;
  User.find().then(user => {
    if (!user.length) {
      const newUser = new User({
        username: 'Jason',
      })

      newUser.save().then(() => {
        updateUserTrips(travelId, res);
      });
    }
  })
  updateUserTrips(travelId, res);

})

const updateUserTrips = (travelId, res) => {
  const newTravel = {
    trip: travelId,
    isPaid: false
  }
  User.updateOne({ username: 'Jason' }, { $push: { trips: newTravel } }).then(result => {
    console.log(result)
    res.json({ result })
  })
}

// travel not payed
router.get('/chercheTrip', async (req, res) => {

  const user = await User.findById(idUser).populate('trips.trip');

  const cartPasPayed = user.trips.filter((trip) => !trip.isPaid)


  res.json({ cartPasPayed })
}
)

//travel payed
router.get('/payTrip', async (req, res) => {
  const user = await User.findById(idUser).populate('trips.trip');

  const cartPayed = user.trips.filter((trip) => !trip.isPaid)

  for (let obj of cartPayed) {
    obj.isPaid = true
  }
  user.save()
})

//delete trip
router.delete("/deleteTrip", async (req, res) => {
  try {
    const travelId = req.body.travelId;
    const user = await User.findById(idUser);

    const cartPayed = user.trips.filter((trip) => !trip.isPaid && trip._id === travelId);

    user.trips.splice(cartPayed, 1);

    await user.save();

    res.json({ result: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur serveur' });
  }
});






//route get panier user
//route put mettre a jour panier payé
// get des voyages payé

module.exports = router;
