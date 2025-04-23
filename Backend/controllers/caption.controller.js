const captionModel = require('../models/caption.model');
const captionService = require('../services/caption.service');
const { validationResult } = require('express-validator');
const blackListTokenModel = require('../models/blacklist.model');




module.exports.registerCaption = async (req, res, next) =>{
    const errors = validationResult(req);
      
    if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
      }

      const { fullname, email, password , vehicle } = req.body;

      const isCaptionAlreadyExist  = await captionModel.findOne({ email });
      if(isCaptionAlreadyExist){
        return res.status(400).json({ message: 'Caption already exist' });
      }

      const hashedPassword = await captionModel.hashPassword(password);

      const caption = await captionService.createCaption({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType
        });
        const token = caption.generateAuthToken();

        res.status(201).json({ token, caption });

}

module.exports.loginCaption = async ( req, res, next) =>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
   
  const{ email , password } = req.body;

  const caption = await captionModel.findOne({ email }).select(' +password ');

  if(!caption){
    return res.status(401).json({ message : 'Invalid email or password '});
  }

  const isMatch = await caption.comparePassword(password);

  if(!isMatch){
    return res.status(401).json({ message: ' Invalid email or password '});
  }

  const token = caption.generateAuthToken();

  res.cookie('token',token);

  res.status(200).json({ token , caption });

}

module.exports.getCaptionProfile = async ( req,res ,next ) =>{
  res.status(200).json({ caption: req.caption });
}

module.exports.logoutCaption = async (req, res , next ) =>{
  
    const token = req.cookies.token || req.headers.authorization.split(' ')[ 1 ];
  
    await blackListTokenModel.create({ token });
    res.clearCookie('token');
  
    res.status(200).json({ message: 'Logout Sucessfully' });
  
}