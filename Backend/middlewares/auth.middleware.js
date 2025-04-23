const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const captionModel = require('../models/caption.model');
const blackListTokenModel = require('../models/blacklist.model');

module.exports.authUser = async(req ,res , next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    //console.log('AuthUser middleware token:', token); // Debug line

    if(!token){
        return res.status(401).json({message : 'No token provided' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });
    if(isBlacklisted){
        return res.status(401).json({message : 'Token is blacklisted' });
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        return next();
    }catch (err) {
        console.error('JWT error:', err.message);
        return res.status(401).json({message : 'Invalid or expired token' });
    }
}


module.exports.authCaption = async(req ,res , next) =>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
    if(!token){
        return res.status(401).json({message : 'Unauthorized' });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });

    if(isBlacklisted){
        return res.status(401).json({message : 'Unauthorized' });
    }

    try{
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        const caption = await captionModel.findById(decoded._id)

        req.captain = caption;

        return next();
    }catch (err) {
        return res.status(401).json({message : 'Unauthorized' });
    }
}


