const { Router } = require('express');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const subCategoriesRouter = require('./subCategories')
const categoriesRouter = require('./categories');
const productRouter = require('./product-Crud');
const grapeRouter = require('./grapes');
const loginRouter = require('./login.js')
const logoutRouter = require('./logout')
const profileRouter = require('./profile')
const authRouter = require('./auth.js');
const reviewRouter = require('./reviews')
const signupRouter = require('./signup')
const paypal = require ('./paypal');
const mepa = require ('./mepa');
const sendmail = require('./sendmail.js');
const cartRouter = require('./cart')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/categories', categoriesRouter);
router.use('/subcategories', subCategoriesRouter);
router.use('/product', productRouter);
router.use('/grapes', grapeRouter);
router.use('/reviews', reviewRouter);
router.use('/login', loginRouter)
router.use('/logout', logoutRouter)
router.use('/profile', profileRouter)
router.use('/signup', signupRouter)
router.use('/auth', authRouter);
router.use('/paypal', paypal);
router.use('/mepa', mepa);
router.use('/mail',sendmail);
router.use('/cart', cartRouter);

module.exports = router;