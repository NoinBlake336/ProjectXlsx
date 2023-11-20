const express = require('express');
const path = require('path');
const router = express.Router();
const passport = require('passport');
const authenticateToken = require('../middleware/authenticate.token');
const { config } = require('../config/config');
router.use(express.static(path.join(__dirname, '../public')));
router.use(express.json());
const jwt = require('jsonwebtoken')
router.get('/',
    // passport.authenticate('jwt',{session:false})
    authenticateToken,
    async(req,res,next)=>{
        try{
            res.send('logeado')
        }catch(err){
            next(err);
        }
});





module.exports = router;