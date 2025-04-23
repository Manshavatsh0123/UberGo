const mongoose = require('mongoose');

// Define the Ride Schema
const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
      },
    captain: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'caption', // Assuming you have a 'Captain' model defined similarly
    },
    origin: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    fare: {
        type: Number,
        required: true,
        min: 0,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending',
        index: true,
    },
    duration: {
        type: Number,
        min: 0, // in seconds
    },
    distance: {
        type: Number,
        min: 0, // in meters
    },
    paymentID: {
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp: {
        type: String,
        required: true,
        select: false
    },
}, { timestamps: true });


const rideModel = mongoose.model('Ride', rideSchema); 
module.exports = rideModel;
