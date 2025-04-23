const rideModel = require('../models/ride.model');
const mapService = require('../services/maps.service');


// Generate 6-digit OTP
function getOtp(length = 6) {
    return Math.floor(100000 + Math.random() * 900000).toString().slice(0, length);
}

// Calculate Fare
async function getFare(origin, destination) {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    let distanceTime;
    try {
        distanceTime = await mapService.getDistanceTime(origin, destination);
        console.log("getDistanceTime() result:", distanceTime);
    } catch (err) {
        console.error("Error calling getDistanceTime():", err.message);
        throw new Error("Map service failed to get distance and duration.");
    }


    const distanceValue = distanceTime?.distance;
    const durationValue = distanceTime?.duration;

    if (!distanceValue || !durationValue) {
        throw new Error('Could not get valid distance or duration from map service');
    }

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    const distanceKm = distanceValue;
    const durationMin = durationValue / 60;

    const fare = {
        auto: Math.round(baseFare.auto + distanceKm * perKmRate.auto + durationMin * perMinuteRate.auto),
        car: Math.round(baseFare.car + distanceKm * perKmRate.car + durationMin * perMinuteRate.car),
        moto: Math.round(baseFare.moto + distanceKm * perKmRate.moto + durationMin * perMinuteRate.moto),
    };

    return fare;
}


// Create Ride
module.exports.createRide = async ({ user, origin, destination, vehicleType }) => {
    if (!user || !origin || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    if (!['auto', 'car', 'moto'].includes(vehicleType)) {
        throw new Error('Invalid vehicle type');
    }

    const fare = await getFare(origin, destination);

    if (!fare[vehicleType] || isNaN(fare[vehicleType])) {
        throw new Error(`Could not calculate a valid fare for vehicle type: ${vehicleType}`);
    }

    const ride = await rideModel.create({
        user,
        origin,
        destination,
        otp: getOtp(6),
        fare: fare[vehicleType],
    });

    return ride;
};

module.exports.getFare = getFare;


module.exports.confirmRide = async (req, res) => {
    const { rideId, captain } = req.body;  

    if (!rideId) {
        return res.status(400).json({ message: 'Ride ID is required' });
    }

    if (!captain || !captain._id) {
        console.error('Missing or invalid captain data:', captain);
        return res.status(400).json({ message: 'Valid captain data is required' });
    }

    try {
        
        const updatedRide = await rideModel
            .findById(rideId)
            .populate('captain', 'name vehicleNumber vehicleModel socketId')  
            .exec();  
        if (!updatedRide) {
            return res.status(404).json({ message: 'Ride not found' });
        }

        
        updatedRide.status = 'accepted';
        updatedRide.captain = captain._id;  
        await updatedRide.save();

        
        const socketId = captain.socketId;
        if (!socketId) {
            return res.status(404).json({ message: 'Captain socketId not found' });
        }

        sendMessageToSocketId(userSocketId, {
            event: "ride-confirmed",
            data: rideData
        });

        return res.status(200).json(updatedRide);  
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: err.message });
    }
};

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    // 1. Find the ride with OTP
    const ride = await rideModel.findOne({ _id: rideId })
        .populate('user')
        .populate('captain')
        .select('+otp'); // Assuming otp is select: false in schema

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    // 🔧 FIXED: Return updated ride object after setting status to 'ongoing'
    const updatedRide = await rideModel.findOneAndUpdate(
        { _id: rideId },
        { status: 'ongoing' },
        { new: true }
    ).populate('user').populate('captain');

    return updatedRide;
};


module.exports.endRide = async ({ rideId, captain }) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}
