const { Router } = require('express');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const subCategoriesRouter = require('./subCategories')
const categoriesRouter = require('./categories');
const productRouter = require('./product-Crud');
const grapeRouter = require('./grapes')


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/categories', categoriesRouter);
router.use('/subcategories', subCategoriesRouter);
router.use('/product', productRouter);
router.use('/grapes', grapeRouter);


module.exports = router;