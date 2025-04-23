const captionModel = require('../models/caption.model');
const axios = require('axios');


//Coodinate{lat,lon}
module.exports.getAddressCoordinate = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Uber-Video-App'
            }
        });

        if (response.data.length > 0) {
            const location = response.data[0];
            return {
                lat: parseFloat(location.lat),
                lng: parseFloat(location.lon)
            };
        } else {
            throw new Error('No results found for the given address.');
        }
    } catch (error) {
        console.error('Nominatim API error:', error.message);
        throw error;
    }
};



//Distace-Time
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    try {

        const apiKey = process.env.ORS_API_KEY || 'your-default-api-key';

        const [originCoords, destinationCoords] = await Promise.all([
            geocodeAddress(origin, apiKey),
            geocodeAddress(destination, apiKey)
        ]);


        if (!originCoords || !destinationCoords) {
            throw new Error('Failed to get valid coordinates for origin or destination');
        }


        const matrixUrl = `https://api.openrouteservice.org/v2/matrix/driving-car`;
        const body = {
            locations: [originCoords, destinationCoords],
            metrics: ["distance", "duration"],
            units: "km"
        };

        const response = await axios.post(matrixUrl, body, {
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            }
        });


        if (
            !response.data ||
            !response.data.distances ||
            !response.data.durations ||
            response.data.distances[0].length < 2 ||
            response.data.durations[0].length < 2
        ) {
            throw new Error('Invalid response data from matrix API');
        }

        const distance = response.data.distances[0][1]; // Distance in km
        const duration = response.data.durations[0][1]; // Duration in seconds

        if (distance === undefined || duration === undefined) {
            throw new Error('Distance or duration is missing in API response');
        }

        return { distance, duration };
    } catch (error) {

        console.error('Error in getDistanceTime:', error.message);
        throw new Error(`Could not get distance or duration from map service: ${error.message}`);
    }
};

async function geocodeAddress(address, apiKey) {
    const url = `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${encodeURIComponent(address)}`;

    try {
        const response = await axios.get(url);


        if (
            response.data &&
            response.data.features &&
            response.data.features.length > 0
        ) {
            return response.data.features[0].geometry.coordinates; // [lon, lat]
        } else {
            throw new Error(`Could not geocode location: ${address}`);
        }
    } catch (error) {
        console.error(`Error in geocodeAddress for ${address}:`, error.message);
        throw new Error(`Geocoding failed for address: ${address}`);
    }
}



// Haversine formula to calculate distance between two coordinates (in km)
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

module.exports.getCaptainsInTheRadius = async (lat, lng, radiusInKm = 5) => {
    if (!lat || !lng) {
        throw new Error(`Invalid coordinates: lat=${lat}, lng=${lng}`);
    }

    try {
        const allCaptains = await captionModel.find({ status: 'active' });

        const nearbyCaptains = allCaptains.filter(captain => {
            if (
                captain.location &&
                typeof captain.location.lat === 'number' &&
                typeof captain.location.lng === 'number'
            ) {
                const dist = getDistanceFromLatLonInKm(
                    lat, lng,
                    captain.location.lat,
                    captain.location.lng
                );

                console.log(`Distance to captain ${captain._id}: ${dist.toFixed(2)} km`);
                return dist <= radiusInKm;
            }
            return false;
        });

        const result = nearbyCaptains.map(captain => ({
            id: captain._id,  
            name: `${captain.fullname.firstname} ${captain.fullname.lastname}`, 
            location: {
                lat: captain.location.lat,
                lng: captain.location.lng
            },
            distance: getDistanceFromLatLonInKm(lat, lng, captain.location.lat, captain.location.lng).toFixed(2),
            socketId: captain.socketId
        }));


        console.log(`Captains found within ${radiusInKm} km:`, result);
        return result;

    } catch (error) {
        console.error('Error filtering captains by radius:', error.message);
        throw new Error('Failed to find nearby captains');
    }

};





//location-Suggestions
module.exports.getLocationSuggestions = async (input) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(input)}&format=json&addressdetails=1&limit=5`;

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'MyAppName/1.0 (https://yourwebsite.com)'
            }
        });

        if (response.data && response.data.length > 0) {
            return response.data;
        } else {
            console.warn('No suggestions found for the input:', input);
            return [];
        }
    } catch (error) {
        console.error('Error fetching location suggestions from Nominatim:', error.message);
        throw new Error('Failed to fetch suggestions');
    }
};
