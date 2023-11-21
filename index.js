

const RouterApi = require('./router');
const path = require('path');
const {logError,errorHandler,boomErrorHandler} = require('./middleware/error.handler');
const express = require('express');
const port = process.env.PORT || 3000;
const cors = require('cors');
require('./utils/auth');
const app = express();
app.use(express.json());
app.use(cors());

RouterApi(app);

app.use(logError);
app.use(errorHandler);
app.use(boomErrorHandler);

app.get('/',async(req,res,next)=>{
    res.send('Hola binevenido a mi servidor')
})

app.listen(port,()=>{
    console.log(`http://localhost:${port}/api/v1/login`);
    console.log("Servidor de DuoWeb");
})