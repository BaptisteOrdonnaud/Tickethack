const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    trips: [
        {
            trip: { type: mongoose.Schema.Types.ObjectId, ref: 'trips' },
            isPaid: { type: Boolean, default: false }
        }
    ],

});




const User = mongoose.model('users', userSchema);

module.exports = User;

