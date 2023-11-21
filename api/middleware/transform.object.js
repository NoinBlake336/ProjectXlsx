const transformObject = {
    json:(document,returnObject)=>{
        returnObject.id = returnObject._id;
        delete returnObject._id;
        delete returnObject.__v;
    },
}


module.exports = {transformObject}