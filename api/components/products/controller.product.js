const ProductServices = require('./service');
const service = new ProductServices();
const xlsx = require('xlsx');
const boom = require('@hapi/boom');

class ControllerProducts {
    async find(query){
        const totalPages = await service.getTotalPage(7);
        const options = {};
        const {
            page,
            limit
        } = query;
        if(page && limit) {
            options.limit = parseInt(limit);
            options.skip = (parseInt(page)-1) * parseInt(limit);
        };

        const getProducts = await service.getProducts(options);
        const result = {
            produt:getProducts,
            page:totalPages,
        };
        return result;
    };    

    async findOne(id){
        const product = await service.getOneProducts(id);
        return {product}
    }

    async create(userId, file) {
        const workbook = xlsx.readFile(file.path);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const productsData = xlsx.utils.sheet_to_json(worksheet);
        const createdProducts = [];
    
        try {
            productsData.forEach(async(items)=>{
                const newProducts = await service.addProducts(userId,items);
            })
            return { createdProducts };
        } catch (error) {
            throw boom.badRequest('Error creating products', error);
        }
    }
    
    

    async update(id,changes){
        const update = await service.updateProduct(id,changes);
        return {update};
    }

    async delete(id){
        const deleteP = await service.deleteProduct(id);
        return { deleteP};
    }



};


module.exports = ControllerProducts;