const boom = require('@hapi/boom');
const {
    models
} = require('../libs/sequelize');
const xlsx = require('xlsx');
class ProductService {
    async getTotalPages(elementsPerPage) {
        // Realiza una consulta para obtener el número total de elementos en la base de datos
        const totalElements = await models.Product.count();

        // Calcula el número total de páginas
        let totalPages = Math.floor(totalElements / elementsPerPage);

        // Agrega una página adicional para los elementos restantes si es necesario
        if (totalElements % elementsPerPage !== 0) {
            totalPages++;
        }
        return totalPages;
    }

    async find(query) {
        const totalPages= await this.getTotalPages(7);
        const options = {};
        const {
            page,
            limit
        } = query;

        if (page && limit) {
            options.limit = parseInt(limit);
            options.offset = (parseInt(page) - 1) * parseInt(limit);
        }

        const products = await models.Product.findAll(options);
        const result = {
            product:products,
            page: totalPages
        }
        return result;
    }

    async findOne(id) {
        const product = await models.Product.findByPk(id);
        if (!product) {
            throw boom.notFound('Producto no existente');
        }
        return product;
    };

    async create(userId, file) {
        const workbook = xlsx.readFile(file.path);
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const productsData = xlsx.utils.sheet_to_json(worksheet);
        const productsWithUserId = productsData.map(productData => ({
            ...productData,
            userId: userId,
        }));

        const newProducts = await models.Product.bulkCreate(productsWithUserId);

        return newProducts;
    };

    async update(id, changes) {
        const product = await this.findOne(id);
        const updateProduct = await product.update(changes);
        return updateProduct;
    };

    async delete(id) {
        const idProduct = await this.findOne(id);
        const deleteProduct = await idProduct.destroy();
        return deleteProduct;
    }
}


module.exports = ProductService;