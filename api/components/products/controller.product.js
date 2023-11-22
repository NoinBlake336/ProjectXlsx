const ProductServices = require('./service');
const service = new ProductServices();


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


};


module.exports = ControllerProducts;