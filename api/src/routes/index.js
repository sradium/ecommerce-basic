const express = require('express');
const router = express.Router();

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../swagger.json');

// Components
const { authRouter } = require('../components/auth/index');
const { categoryRouter } = require('../components/categories/index');
const { productRouter } = require('../components/products/index');

// Routes
router.use('/auth', authRouter);
router.use('/categories', categoryRouter);
router.use('/products', productRouter);

// Documentation route
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
