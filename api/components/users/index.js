const express = require('express');
const router = express.Router();
const validatorhandler = require('../../middleware/validator.handler')
const {getUserSchema,createUserSchema,updateUserSchema} = require('./schema')

module.exports = router;