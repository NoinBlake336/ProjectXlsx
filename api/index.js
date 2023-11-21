const express = require('express');
const app = express();
const cors = require('cors');
const Router = require('./router');
const bodyParser = require('body-parser');
const {logErrors,errorHandler,boomErrorHandler} = require('./middleware/error.handler');
const {config} = require('./config');
const connectDB = require('./db/libs');
const authenticateToken = require('./middleware/authenticate.token');

require('./utils/auth');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors());

connectDB();

app.get('/',
    async(req,res,next)=>{
        res.send('Bienvenido a mi servidor');
    }
);

app.get('/dashboard',
    authenticateToken,
    async(req,res,next)=>{
        res.send('Hola');
    }  
)

Router(app);
app.use(logErrors);
app.use(errorHandler);
app.use(boomErrorHandler);

app.listen(config.port,()=>{
    console.log(config.port);
});