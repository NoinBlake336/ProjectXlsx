const express = require('express');
const router = express.Router();
const validatorhandler = require('../../middleware/validator.handler')
const {getUserSchema,createUserSchema,updateUserSchema} = require('./schema')

const ControllerUser = require('./controller.user');
const validaterHandler = require('../../middleware/validator.handler');
const controller = new ControllerUser;

router.get('/',
    async(req,res,next)=>{
        try {
            const user = await controller.find();
            res.status(200).json(user);
        } catch (error) {
            next(error)
        }
    }
);

router.get('/:id',
    validatorhandler(getUserSchema,'params'),
    async (req,res,next)=>{
        try {
            const {id} = req.params;
            const user = await controller.findOne(id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        };
    },
);

router.post('/register',
    validatorhandler(createUserSchema,'body'),
    async(req,res,next)=>{
        try {
            const body = req.body;
            const {name,email,password} = body;
            const newUser = await controller.create({name,email,password});
            res.status(200).json(newUser);
        } catch (error) {
            next(error);
        }
    },
);

router.patch('/:id',
    validaterHandler(getUserSchema,'params'),
    validaterHandler(updateUserSchema,'body'),
    async(req,res,next)=>{
        try {
            const {id} = req.params;
            const body = req.body;
            const updateUser = await controller.update(id,body);
            res.status(201).json(updateUser);
        } catch (error) {
            next(error);
        };
    },
);

module.exports = router;