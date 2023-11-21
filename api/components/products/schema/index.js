const Joi = require('joi');

const id = Joi.string()
const product = Joi.string();
const price = Joi.number().integer();
const file = Joi.object();
const limit = Joi.number().integer();
const page = Joi.number().integer();
const userId = Joi.string();

const getSchemaProduct = Joi.object({
    id:id.required(),
});


const createSchemaProducts = Joi.object({
    file,
    userId:userId.required(),
});

const updateSchemaProducts = Joi.object({
    product,
    price,
});

const querySchemaProducts = Joi.object({
    limit,
    page,
    price,
});


module.exports = {getSchemaProduct,createSchemaProducts,updateSchemaProducts,querySchemaProducts}