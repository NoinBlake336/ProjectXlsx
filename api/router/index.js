const express = require('express');

const userRouter = require('../components/users');
const authRouter = require('../components/auth');
const Router = (app)=>{
    const router = express.Router();
    app.use('/api', router);
    router.use('/users',userRouter);
    router.use('/auth',authRouter);
};

module.exports = Router;