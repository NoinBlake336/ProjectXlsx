const Joi = require('joi');

const id = Joi.string();
const name = Joi.string();
const email = Joi.string();
const password = Joi.string();

const getUserSchema = Joi.object({
    id:id.required(),
});

const createUserSchema = Joi.object({
    name:name.required(),
    email:email.required(),
    password:password.required(),
});

const updateUserSchema = Joi.object({
    email,
    password
});


module.exports = {
    getUserSchema,
    createUserSchema,
    updateUserSchema
}