const express = require('express');
const router = express.Router();

const jwt = require('jsonwebtoken');
const passport = require('passport');
const {config} = require('../../config');

router.post('/',
    passport.authenticate('local',{session:false}),
    async(req,res,next)=>{
        try {
            const user = req.user;
            const payload = {
                sub:user.id,
            };
            const token = jwt.sign(payload,config.secretKey,{expiresIn:'20min'});
            res.status(201).json({
                user:user.id,
                token:token,
            });

        } catch (error) {
            next(error);
        };
    },
);


module.exports = router;