const productServices = require('./productServices');
const errors = require('../../errors');

// Controller is a function that returns an object with the methods
// that will be used in the routes
const productController = (
    productRepositoryInterface,
    productRepositoryImpl,
    categoryRepositoryInterface,
    categoryRepositoryImpl
) => {
    // Repositories, services and logic are injected as dependencies
    const dbProductRepository = productRepositoryInterface(productRepositoryImpl());
    const dbCategoryRepository = categoryRepositoryInterface(categoryRepositoryImpl());
    const productService = productServices();

    // Pagination
    // TODO: Move pagination to services
    // TODO: Get page size from config or request
    // TODO: Get current page from body json not query
    // TODO: Maybe is a good idea to create a pagination service to all the controllers
    const perpage = 25;

    // Methods

    // Get all products
    // GET /products
    const getAllProducts = async (req, res) => {
        try {
            const response = {};

            // Get all products
            const products = await productService.getAllProducts(dbProductRepository);
            
            // Paginate the products
            const page = req.query.page || 1;
            const offset = (page - 1) * perpage;
            const paginatedItems = products.slice(offset).slice(0, perpage);
            const total_pages = Math.ceil(products.length / perpage);

            // Return the products
            response.items = paginatedItems;
            response.paginate = {};
            response.paginate.page = page;
            response.paginate.perpage = perpage;
            response.paginate.total_items_page = paginatedItems.length;
            response.paginate.total_pages = total_pages;
            response.paginate.next = page < total_pages ? page + 1 : null;
            response.paginate.previous = page > 1 ? page - 1 : null;
            res.status(200).json(response);
        } catch (error) {
            errors.errorHandler(error, req, res);
        }
    }

    // Get product by id
    // GET /products/:id
    const getProductById = async (req, res) => {
        try {
            const response = {};
            const id = req.params.id;

            // Get product by id
            const product = await productService.getProductById(dbProductRepository, id);
            
            // Return the product
            response.item = product;
            res.status(200).json(response);
        } catch (error) {
            errors.errorHandler(error, req, res);
        }
    }

    // Get categories by product
    // GET /products/:id/categories
    const getCategoriesByProduct = async (req, res) => {
        try {
            const response = {};
            const id = req.params.id;

            // Get categories by product
            const {product, categories} = await productService.getCategoriesByProduct(dbProductRepository, id);
            
            // Paginate the categories
            const page = req.query.page || 1;
            const offset = (page - 1) * perpage;
            const paginatedCategories = categories.slice(offset).slice(0, perpage);
            const total_pages = Math.ceil(categories.length / perpage);

            // Return the categories
            response.item = {};
            response.item.product = product;
            response.item.categories = paginatedCategories;
            response.paginate = {};
            response.paginate.page = page;
            response.paginate.perpage = perpage;
            response.paginate.total_items_page = paginatedCategories.length;
            response.paginate.total_pages = total_pages;
            response.paginate.next = page < total_pages ? page + 1 : null;
            response.paginate.previous = page > 1 ? page - 1 : null;
            res.status(200).json(response);
        } catch (error) {
            errors.errorHandler(error, req, res);
        }
    }

    // Create product
    // POST /products
    // {
    //    "name": "Product name",
    //    "description": "Product description",
    //    "price": 100,
    //    "stock": 10,
    //    "categories": [1, 2, 3]
    //}
    const createProduct = async (req, res) => {
        try {
            const response = {};
            const  { name, description, price, stock, images, categories } = req.body;
            
            // Create product
            const newProduct = await productService.createProduct(dbProductRepository, name, description, price, stock, images);
            
            // Add categories to product
            const productCategories = await productService.addCategoriesToProduct(dbProductRepository, newProduct.id, categories);

            // Return the product
            response.item = newProduct;
            response.item.categories = productCategories;
            res.status(201).json(response);
        } catch (error) {
            errors.errorHandler(error, req, res);
        }
    }

    // Update product
    // PUT /products/:id
    // {
    //    "name": "Product name",
    //    "description": "Product description",
    //    "price": 100,
    //    "stock": 10,
    //    "categories": [1, 2, 3]
    //}
    const updateProduct = async (req, res) => {
        try {
            const response = {};
            const id = req.params.id;
            const { name, description, price, stock, images, categories } = req.body;

            const params = {
                name,
                description,
                price,
                stock,
                images
            };

            // Update product
            const updatedProduct = await productService.updateProduct(dbProductRepository, id, params);
            
            response.item = {};
            // Return the product
            response.item.product = updatedProduct;
            // Update categories
            if (categories) {
                // TODO: Change add categories to product to update categories to product
                // TODO: Delete categories from product if not in the array?
                const productCategories = await productService.addCategoriesToProduct(dbProductRepository, id, categories);
                response.item.categories = productCategories;
            }
            res.status(200).json(response);
        } catch (error) {
            errors.errorHandler(error, req, res);
        }
    }

    // Delete product
    // DELETE /products/:id
    const deleteProduct = async (req, res) => {
        try {
            const response = {};
            const id = req.params.id;

            // Delete product
            await productService.deleteProduct(dbProductRepository, id);
            
            // Return the product
            response.message = 'Product deleted';
            res.status(200).json(response);
        } catch (error) {
            errors.errorHandler(error, req, res);
        }
    }

    return {
        getAllProducts,
        getProductById,
        getCategoriesByProduct,
        createProduct,
        updateProduct,
        deleteProduct
    }
}

module.exports = productController;