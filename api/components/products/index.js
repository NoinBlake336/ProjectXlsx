const express = require('express');
const boom = require('@hapi/boom')
const router = express.Router();
const validatorHandler = require('../../middleware/validator.handler');
const  {getSchemaProduct,createSchemaProducts,updateSchemaProducts,querySchemaProducts} = require('./schema');
const ControllerProducts = require('./controller.product');
const controller = new ControllerProducts;
const multer = require('multer');
const upload = multer({
    dest:'/tmp/'
})


router.get('/',
    validatorHandler(querySchemaProducts,'query'),
    async(req,res,next)=>{
        try {
            const product = await controller.find(req.query);
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/create',
    upload.single('file'),
    validatorHandler(createSchemaProducts, 'body'),
    async (req, res, next) => {
        try {
            const body = req.body;
            const { userId } = body;
            const file = req.file;

            if (!file) {
                return next(boom.badRequest('File is required'));
            }

            const newProducts = await controller.create(userId, file);
            res.status(201).json(newProducts);
        } catch (error) {
            next(error);
        }
    }
);

router.patch('/update/:id',
    validatorHandler(getSchemaProduct,'params'),
    validatorHandler(updateSchemaProducts,'body'),
    async (req,res,next)=>{
        try {
            const {id} = req.params;
            const changes =  req.body;
            const updateProduct = await controller.update(id,changes);
            res.status(201).json(updateProduct);

        } catch (error) {
            next(error);
        }
    }
);

router.delete('/delete/:id',
    validatorHandler(getSchemaProduct,'params'),
    async (req,res,next)=>{
        try {
            const {id} = req.params;
            const deleteProducts = await controller.delete(id);
            res.status(201).json(deleteProducts);
        } catch (error) {
            next(error);
        }
    }
);

module.exports = router;