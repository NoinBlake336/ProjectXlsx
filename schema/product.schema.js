const Joi = require('joi');

const id = Joi.number().integer();
const userId = Joi.number().integer();
const product = Joi.string();
const price = Joi.number().integer();
const file = Joi.object();
const limit = Joi.number().integer();
const page = Joi.number().integer();
const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

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
    // price_min,
    // price_max:price_max.when('price_min',{
    //     is:Joi.number().integer(),
    //     then: Joi.required(),
    // })
});


module.exports = {getSchemaProduct,createSchemaProducts,updateSchemaProducts,querySchemaProducts}