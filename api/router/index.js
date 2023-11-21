const express = require('express');

const Router = (app)=>{
    const router = express.Router();
    app.use('/api', router);
};

module.exports = Router;