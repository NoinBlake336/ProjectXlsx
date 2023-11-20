const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const path = require('path');
const {config} =require('../config/config');
const router = express.Router();

router.use(express.static(path.join(__dirname, '../public')));

router.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'../public','login.html'));
});

router.post('/',
    passport.authenticate('local',{session:false}),
    async (req,res,next)=>{
        try{
            const user = req.user;
            const payload = {
                sub: user.id,
            };
            const token = jwt.sign(payload,config.jwtSecret,{expiresIn:'15m'});
            res.status(201).json({
                user:user.id,
                token:token,
            });
        }catch(err){
            next(err)
        }
    }
)
module.exports = router;