const express = require('express');
const boom = require('@hapi/boom')
const router = express.Router();
const validatorHandler = require('../../middleware/validator.handler');
const  {getSchemaProduct,createSchemaProducts,updateSchemaProducts,querySchemaProducts} = require('./schema');
const ControllerProducts = require('./controller.product');
const controller = new ControllerProducts;
const multer = require('multer');
const upload = multer({
    dest:'upload/',
});


router.get('/',
    validatorHandler(querySchemaProducts,'query'),
    async(req,res,next)=>{
        try {
            const product = await controller.find(req.query);
            res.status(200).json(product);
        } catch (error) {
            next(err);
        }
    }
);

router.post('/create',
    upload.single('file'),
    validatorHandler(createSchemaProducts,'body'),
    async(req,res,next)=>{
        try {
            const body = req.body;
            const {userId} = body;
            const file = req.file;
            if(!file){
                boom.badRequest('File is requerid');
            };

            const newProducts = await controller.create(userId,file);
            res.status(201).json(newProducts);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;