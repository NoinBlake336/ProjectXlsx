const express = require('express');

const userRouter = require('./user.router');
const authRouter = require('./auth.router');
const dashboardRouter = require('./dashboard.router');
const routerProduct = require('./products.router');
const RouterApi = (app)=>{
    const router = express.Router();
    app.use('/api/v1',router);
    router.use('/users',userRouter);
    router.use('/login',authRouter);
    router.use('/dashboard',dashboardRouter);
    router.use('/products',routerProduct);
};

module.exports = RouterApi;