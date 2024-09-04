const mongoose = require('mongoose')

const MechanicSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    profilePicture: String,
    rating: {
        type: Number,
        default: 0
    },
    availability: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model('Mechanic', MechanicSchema)