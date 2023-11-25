const boom = require('@hapi/boom');
const Model = require('../model');
const { ObjectId } = require('mongoose').Types;

class ProductServices {
    async addProducts(userId, productData){
        try {
            // Validar que userId sea un string válido y de longitud 24
            if (!ObjectId.isValid(userId)) {
                throw new Error('userId no es válido');
            }
    
            const newProduct = new Model({
                userId: userId,  // Utilizar new ObjectId para convertir a ObjectId
                product: productData.product,
                price: productData.price,
                date: new Date(),
            });
    
            const savedProduct = await newProduct.save();
            console.log('Producto guardado:', savedProduct);
        } catch (error) {
            console.error('Error al guardar el producto:');
        }
        console.log(userId);
        console.log(productData);
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
        const products = await Model.find({},null,options);
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