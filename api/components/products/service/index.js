const boom = require('@hapi/boom');
const Model = require('../model');

class ProductServices {
    async addProducts(userId,productData){
        const newProduct = new Model({
            ...productData,
            userId: userId,
        });

        await newProduct.save();
        return newProduct;
        
    }

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
    };

    async getOneProducts(id){
        const product = await Model.findById(id);
        if(!product){
            boom.badRequest('Not Product');
        };

        return product;
    };

    async updateProduct(id,changes){
        const updateProduct = await Model.findOneAndUpdate(
            {_id:id},
            {
                product:changes.product,
                price:changes.price,
                date:new Date(),
            },
            {new:true},
        );

        return updateProduct;
    }

    async deleteProduct(id){
        const deleteProduct = await Model.findByIdAndDelete(id);
        return deleteProduct;
    }
};



module.exports = ProductServices;