const logErrors = (err,req,res,next)=>{
    next(err);
};

const errorHandler = (err,req,res,next)=>{
    res.status(500).json({
        message:err.message,
        stack:err.stack
    });
};

const boomErrorHandler = (err,req,res,next)=>{
    if(err.boom){
        const {ouptup} = err;
        res.status(ouptup.statusCode).json(ouptup.payload);
    }else{
        next(err);
    }
}

module.exports = {logErrors,errorHandler,boomErrorHandler};

