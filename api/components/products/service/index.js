const boom = require('@hapi/boom');
const Model = require('../model');

class ProductServices {
    async addProducts(userId,productData){ 
        const newProduct = await Model({
            userId:userId,
            product:productData.prproductData.product,
            price:productData.productData.price,
            date: new Date(),
        }) 


        newProduct.save()
        .then(savedProduct => {
            console.log('Producto guardado:', savedProduct);
        })
        .catch(error => {
            console.error('Error al guardar el producto:', error);
        });
        console.log(userId);
        console.log(productData)
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