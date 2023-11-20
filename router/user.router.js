const express = require('express');
const router = express.Router();
const validatorHandler = require('../middleware/valdator.handler');
const {createUserSchema,updateUserschema} = require('../schema/user.schema');
const path = require('path');
const UserServices =  require('../services/user.service');
const service = new UserServices();

router.use(express.static(path.join(__dirname, '../public')));



router.get('/register',
    (req,res,next)=>{
        res.sendFile(path.join(__dirname,'../public','register.html'));
    }
);

router.post('/register',
    validatorHandler(createUserSchema,'body'),
    async(req,res,next)=>{
        try{
            const body = req.body;
            const newUser = await service.create(body);
            res.status(201).json(newUser);
        }catch(err){
            next(err);
        };
    }
);


module.exports = router;