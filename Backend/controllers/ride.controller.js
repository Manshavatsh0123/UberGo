const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');
const { sendMessageToSocketId } = require('../socket');
const rideModel = require('../models/ride.model');
const userModel = require('../models/user.model');
const captionModel = require('../models/caption.model')

module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { userId, origin, destination, vehicleType } = req.body;

    try {

        const ride = await rideService.createRide({ user: req.user._id, origin, destination, vehicleType });


        res.status(201).json(ride);


        const originCoordinates = await mapService.getAddressCoordinate(origin);


        const captainsInRadius = await mapService.getCaptainsInTheRadius(
            originCoordinates.lat,
            originCoordinates.lng,
            50
        );


        ride.otp = "";


        const rideWithUser = await rideModel.findOne({ _id: ride._id })
            .populate('user', 'fullname email');


        captainsInRadius.forEach(captain => {
            if (captain.socketId) {
                sendMessageToSocketId(captain.socketId, {
                    event: 'new-ride',
                    data: rideWithUser
                });
            }
        });

    } catch (err) {
        console.log(err);
        if (!res.headersSent) {
            return res.status(500).json({ message: err.message });
        }
    }
};

module.exports.getFare = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    try {
        const fare = await rideService.getFare(origin, destination);
        return res.status(200).json(fare);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};


module.exports.confirmRide = async (req, res) => {
    const { rideId, captainId } = req.body;

    console.log('Received captainId:', captainId);

    try {
        // Find the captain by their ID
        const captain = await captionModel.findById(captainId);
        if (!captain) {
            console.log(`No captain found with id: ${captainId}`);
            return res.status(404).json({ message: 'Captain not found' });
        }

        // Find the ride by its ID and populate the captain field
        const ride = await rideModel.findById(rideId).populate('captain');
        if (!ride) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        // Assign the captain to the ride and update the status
        ride.captain = captain._id;
        ride.status = 'accepted';  
        await ride.save();  

        // Get the captain's socketId from the captain document
        const socketId = captain.socketId;  // Make sure socketId is stored in the captain model

        if (!socketId) {
            return res.status(404).json({ message: 'Captain socketId not found' });
        }

        // Send the message to the captain's socket
        sendMessageToSocketId(socketId, {
            event: 'ride-confirmed',
            data: ride
        });

        return res.status(200).json(ride);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: err.message });
    }
};

module.exports.startRide = async (req, res) => {
    const errors = validationResult(req);

    // 1. Check validation errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId, otp, captainId } = req.body;

    // 2. Log input for debugging
    console.log('Starting ride with:', { rideId, otp, captainId });

    // 3. Check for missing fields
    if (!rideId || !otp || !captainId) {
        return res.status(400).json({ message: 'rideId, otp, and captainId are required.' });
    }

    // 4. Check if authenticated captain is present
    if (!req.captain) {
        return res.status(401).json({ message: 'Unauthorized: captain not found.' });
    }

    try {
        // 5. Start the ride using the authenticated captain
        const ride = await rideService.startRide({
            rideId,
            otp,
            captain: req.captain
        });

        console.log('Ride successfully started:', ride);

        // 6. Notify user via socket
        if (ride?.user?.socketId) {
            sendMessageToSocketId(ride.user.socketId, {
                event: 'ride-started',
                data: ride
            });
        }

        return res.status(200).json(ride);

    } catch (err) {
        console.error("Start ride error:", err);
        return res.status(500).json({ message: err.message || 'Internal Server Error' });
    }
};




module.exports.endRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { rideId } = req.body;

    try {
        const ride = await rideService.endRide({ rideId, captain: req.captain });

        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-ended',
            data: ride
        })



        return res.status(200).json(ride);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } s
}
