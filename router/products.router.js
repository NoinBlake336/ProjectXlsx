const express = require('express');
const router = express.Router();
const validatorhandler = require('../middleware/valdator.handler');
const {
    createSchemaProducts,
    updateSchemaProducts,
    getSchemaProduct,
    querySchemaProducts
} = require('../schema/product.schema');
const ProductServices = require('../services/product.service');
const service = new ProductServices();
// const multer = require('multer');
// const upload = multer({
//     dest: 'uploads/'
// });

router.get('/',
    validatorhandler(querySchemaProducts,"query"),
    async (req, res, next) => {
        try { 
            
            // Consultar los productos en la base de datos con el límite y el índice de inicio
            const products = await service.find(req.query);
            
            res.status(201).json(products);
        } catch (err) {
            next(err);
        }
});


router.get('/:id',
    validatorhandler(getSchemaProduct, "params"),
    async (req, res, next) => {
        try {
            const {
                id
            } = req.params;
            const product = await service.findOne(id);
            res.status(201).json(product);
        } catch (err) {
            next(err);
        }
    }
);

router.post('/create',
    validatorhandler(createSchemaProducts, "body"),
    async (req, res, next) => {
        try {
            const body = req.body.userId
            const file = req.file;
            if (!file) {
                throw new Error('File is required');
            }
            // Aquí puedes agregar más validaciones para el archivo cargado por el usuario
            // ...;
            console.log(body)
            const newProducts = await service.create(body,file);
            res.status(201).json(newProducts);
        } catch (err) {
            next(err);
        }
    }
);

router.patch('/update/:id',
    validatorhandler(getSchemaProduct, "params"),
    validatorhandler(updateSchemaProducts, "body"),
    async (req, res, next) => {
        try {
            const {
                id
            } = req.params;
            const changes = req.body;
            const updateProducts = await service.update(id, changes);
            res.status(201).json(updateProducts);
        } catch (err) {
            next(err);
        }
    }
);

router.delete('/delete/:id',
    validatorhandler(getSchemaProduct, "params"),
    async (req, res, next) => {
        try {
            const {
                id
            } = req.params;
            const deleteProducts = await service.delete(id);
            res.status(201).json(deleteProducts);
        } catch (err) {
            res.status(400).json(err);
            next(err.sqlMessage);
        }
    }
);


module.exports = router;