const categoryServices = require('../categories/categoryServices');
const errors = require('../../errors');

// Controller is a function that returns an object with the methods
// that will be used in the routes
const categoryController = (
    categoryRepositoryInterface,
    categoryRepositoryImpl,
    productRepositoryInterface,
    productRepositoryImpl
) =>{
    // Repositories, services and logic are injected as dependencies
    const dbCategoryRepository = categoryRepositoryInterface(categoryRepositoryImpl());
    const dbProductRepository = productRepositoryInterface(productRepositoryImpl());
    const categoryService = categoryServices();

    // Pagination
    // TODO: Move pagination to services
    // TODO: Get page size from config or request
    // TODO: Get current page from body json not query string
    // TODO: Maybe is a good idea to create a pagination service to all the controllers
    const perpage = 25;

    // Methods

    // Get all categories
    // GET /categories
    const getAllCategories = async (req, res) => {
        try {
            const response = {};

            // Get all categories
            const items = await categoryService.getAllCategories(dbCategoryRepository);
            
            // Paginate the categories
            const page = req.query.page || 1;
            const offset = (page - 1) * perpage;
            const paginatedItems = items.slice(offset).slice(0, perpage);
            const total_pages = Math.ceil(items.length / perpage);

            
            // Return the categories
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

    // Get category by id
    // GET /categories/:id
    const getCategoryById = async (req, res) => {
        try {
            const response = {};
            const id = req.params.id;

            // Get category by id
            const category = await categoryService.getCategoryById(dbCategoryRepository, id);

            // Return the category
            response.item = category;
            res.status(200).json(response);
        } catch (error) {
            errors.errorHandler(error, req, res);
        }
    }

    // Get products by category
    // GET /categories/:id/products
    const getProductsByCategory = async (req, res) => {
        try {
            const response = {};
            const id = req.params.id;

            // Get products by category
            const {category, products} = await categoryService.getProductsByCategory(dbCategoryRepository, id);
            
            // Paginate the products
            const page = req.query.page || 1;
            const offset = (page - 1) * perpage;
            const paginatedItems = products.slice(offset).slice(0, perpage);
            const total_pages = Math.ceil(products.length / perpage);

            // Return the products
            response.item = {};
            response.item.category = category;
            response.item.products = paginatedItems;
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

    // Create category
    // POST /categories
    // {
    //     "name": "Category name",
    //     "description": "Category description"
    //}
    const createCategory = async (req, res) => {
        try {
            const { name, description } = req.body;
            const response = {};

            // Create category
            const newCategory = await categoryService.createCategory(dbCategoryRepository, name, description);
            
            // Return the category
            response.item = newCategory;
            res.status(201).json(response);
        } catch (error) {
            errors.errorHandler(error, req, res);
        }
    }

    // Update category
    // PUT /categories/:id
    const updateCategory = async (req, res) => {
        try {
            const response = {};
            const id = req.params.id;
            const { name, description } = req.body;
            
            // TODO: Move validation to middleware
            if(!name && !description) {
                throw createError(400, 'Bad request');
            }
            const params = {};
            if (name) {
                params.name = name;
            }
            if (description) {
                params.description = description;
            }

            // Update category
            const updateCategory = await categoryService.updateCategory(dbCategoryRepository, id, params);
            
            // Return the category
            response.item = updateCategory;
            res.status(200).json(response);
            
        } catch (error) {
            errors.errorHandler(error, req, res);
        }
    }

    // Delete category
    // DELETE /categories/:id
    const deleteCategory = async (req, res) => {
        try {
            const response = {};
            const id = req.params.id;

            // Delete category
            await categoryService.deleteCategory(dbCategoryRepository, id);
            
            response.message = 'Category deleted successfully';
            res.status(200).json(response);
        } catch (error) {
            errors.errorHandler(error, req, res);
        }
    }

    // Add products to category
    // POST /categories/:id/products
    // {
    //     "productIds": "array of product ids"
    //}
    const addProductsToCategory = async (req, res) => {
        try {
            const response = {};
            const id = req.params.id;
            const { productIds } = req.body;

            // Add products to category
            await categoryService.addProductsToCategory(dbCategoryRepository, id, productIds);
            
            // Return the category
            // response.item = updatedCategory;
            response.message = 'Products added successfully';
            res.status(200).json(response);
        } catch (error) {
            errors.errorHandler(error, req, res);
        }
    }


    return {
        getAllCategories,
        getCategoryById,
        getProductsByCategory,
        createCategory,
        updateCategory,
        deleteCategory,
        addProductsToCategory
    }
};

module.exports = categoryController;