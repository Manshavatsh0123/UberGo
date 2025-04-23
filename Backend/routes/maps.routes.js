const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const { query, validationResult } = require('express-validator');
const mapController = require('../controllers/map.controller');


// Route to get coordinates
router.get('/get-coordinates',
    query('address').isString().isLength({ min: 3 }).withMessage('Address is required and must be at least 3 characters.'),
    authMiddleware.authUser,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    mapController.getCoordinates
);

// Route to get distance and time
router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }).withMessage('Origin must be at least 3 characters long.'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Destination must be at least 3 characters long.'),
    authMiddleware.authUser,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    mapController.distanceController
);

//location-Suggestions
router.get('/autocomplete',
    query('input').isString().isLength({ min: 3 }).withMessage('Input must be at least 3 characters long.'),
    authMiddleware.authUser,
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    mapController.getSuggestions
);
module.exports = router;
