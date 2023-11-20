const Joi = require('joi');

const name = Joi.string()
const email = Joi.string().email();
const password = Joi.string().min(8);


const createUserSchema = Joi.object({
    name:name.required(),
    email:email.required(),
    password:password.required(),
});

const updateUserschema = Joi.object({
    email,
    password
});


module.exports = {createUserSchema,updateUserschema};