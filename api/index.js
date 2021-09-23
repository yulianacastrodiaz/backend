const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const preloadCategories = require('./src/preload/preloadCategories')
const preloadGrapes = require('./src/preload/preloadGrapes')
const preloadSubCategories = require('./src/preload/preloadSubCategories')
const presetCategoryToSubCategory = require('./src/preset/presetCategoryToSubCategory')
const preloadProducts = require('./src/preload/preloadProducts')
const presetProducts = require('./src/preset/presetProducts')
const preloadReviews = require('./src/preload/preloadReviews')
const presetReviews = require('./src/preset/presetReviews')

// Syncing all the models at once.
const force = true;
try {
  conn.sync({ force })
    .then(async() => {
      console.log('base de datos conectada! :D');
      if(force) {
        const categories = await preloadCategories();  
        console.log('precarga de categorías: done :)');
        const subCategories = await preloadSubCategories();  
        console.log('precarga de subcategorías: done :)');
        const grapes = await preloadGrapes();  
        console.log('precarga de uvas: done :)');
        const products = await preloadProducts();
        console.log('precarga de productos: done :)');
        const reviews = await preloadReviews();
        console.log('precarga de reviews: done :)');
        const setCategoriesToSubCategories = await presetCategoryToSubCategory();
        const setProducts = await presetProducts();
        console.log('preseteo de productos: done :)');
        const setReviews = await presetReviews();
        console.log('preseteo de reviews: done :)');
      }
      server.listen(3001, () => {
        console.log('%s listening at 3001'); // eslint-disable-line no-console
      });
    }).catch(e => {
      console.log(e)
    })  
} catch (error) {
  console.log(error)
}