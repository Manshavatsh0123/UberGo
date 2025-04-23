const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const rideController = require('../controllers/ride.controller')
const authMiddleware = require('../middlewares/auth.middleware');
const { query } = require("express-validator");
const { getFare } = require("../controllers/ride.controller");


router.post('/create',
    authMiddleware.authUser,
    body('origin').isString().isLength({ min: 3 }).withMessage('Invalid origin address'), // changed
    body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type'),
    body('fare').isNumeric().withMessage('Fare must be a number'),
    rideController.createRide
)

router.get('/get-fare',
    authMiddleware.authUser,
    query('origin').isString().isLength({ min: 3 }).withMessage('Invalid origin address'),
    query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
    getFare
)

router.post('/confirm',
    authMiddleware.authCaption,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    body('captainId').isMongoId().withMessage('Invalid caption id'), 
    rideController.confirmRide
);



router.post('/start-ride',
    authMiddleware.authCaption,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    body('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
    body('captainId').isMongoId().withMessage('Invalid captain id'),
    rideController.startRide
);

router.post('/end-ride',
    authMiddleware.authCaption,
    body('rideId').isMongoId().withMessage('Invalid ride id'),
    rideController.endRide
)


module.exports = router;