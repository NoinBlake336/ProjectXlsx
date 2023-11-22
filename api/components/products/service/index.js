const boom = require('@hapi/boom');
const Model = require('../model');

class ProductServices {
    async getTotalPage(elementsPerPage){
        const totalElements = await Model.countDocuments();
        let totalPages = Math.floor(totalElements / elementsPerPage);

        if(totalElements % elementsPerPage !== 0){
            totalPages++;
        };
        return totalPages;
    };

    async getProducts(options){
        const products = await Model.findAll({},null,options);
        return products;
    }

    async getOneProducts(id){
        const product = await Model.findById(id);
        if(!product){
            boom.badRequest('Not Product');
        };

        return product;
    }
};



module.exports = ProductServices;