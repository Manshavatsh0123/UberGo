const { getDistanceTime } = require('../services/maps.service');
const { validationResult } = require('express-validator');
const mapService = require('../services/maps.service');

// Controller to get coordinates
module.exports.getCoordinates = async (req, res) => {
    const { address } = req.query;
    try {
        const coordinates = await getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' });
    }
};

// Controller to get distance and time
module.exports.distanceController = async (req, res) => {
    const { origin, destination } = req.query;

    console.log('Origin:', origin);
    console.log('Destination:', destination);

    try {
        const result = await getDistanceTime(origin, destination);

        res.status(200).json({
            origin,
            destination,
            distance_km: result.distance,
            duration_min: Math.round(result.duration / 60)
        });
    } catch (error) {
        console.error('Controller Error:', error.message);
        res.status(500).json({ error: 'Failed to get distance and time.' });
    }
};

//location-Suggestions
module.exports.getSuggestions = async (req, res) => {
    const { input } = req.query;


    if (!input || input.length < 3) {
        return res.status(400).json({ error: 'Input must be at least 3 characters long.' });
    }

    try {
        const { input } = req.query;
        //console.log('Received input:', input);

        const suggestions = await mapService.getLocationSuggestions(input);


        return res.status(200).json(suggestions);
    } catch (error) {
        console.error('Error in getSuggestions controller:', error.message);
        return res.status(500).json({ error: error.message || 'Failed to fetch suggestions.' });
    }
};