'use strict ';


const { Product } = require('../db')


// const router = Router();

module.exports = {


    allProducts: async function () {
        let prod = await Product.findAll()
        return prod
    },

    name: async function (name) {

        // let producto = await Product.findOne({
        //     where: { name: name }
        // })
        let data = await this.allProducts()
        const nombre = data.filter(p => p.name.includes(name))
        return (nombre.length > 0) ? (nombre)
            : (`En nuestro catalogo no existen productos que coincidan con el termnino ${nombre}`)
    },

    id: async function (id) {
        let data = await this.allProducts()
        id = parseInt(id)
        if (typeof id !== "number") { return (`El id ${id} ingresado, no es del tipo numerico`) }
        let byId = data.filter(p => p.id === id)
        return (byId.length > 0) ? (byId)
            : (`No tenemos existencia de un producto con ${id} como id`)
    },

    price: async function (price) {
        let data = await this.allProducts()
        price = parseInt(price)
        if (typeof price !== "number") { return (`El precio ${price} ingresado, no es del tipo numerico`) }
        let byPrice = data.filter(p => p.price == price)
        return (byPrice.length > 0) ? (byPrice)
            : (`No encontramos coincidencia exacta de un producto con el precio ${price}`)
    },

    year: async function (year) {
        let data = await this.allProducts()
        year = parseInt(year)
        if (typeof year !== "number") { return (`El año ${year} ingresado no es del tipo numerico`) }
        let byYear = data.filter(p => p.year === year)
        return (byYear.length > 0) ? (byYear)
            : (`No encontramos coincidencia exacta de un producto con el año ${year}`)
    },
    rating: async function (rating) {
        let data = await this.allProducts()
        rating = parseInt(rating)
        if (typeof rating !== "number") { return (`El rating ${rating} ingresado no es del tipo numerico`) }
        let byRating = data.filter(p => p.rating === rating)
        return (byRating.length > 0) ? (byRating)
            : (`No encontramos coincidencia exacta de un producto con el rating ${rating}`)
    },
    az: async function (az) {
        az = az.toLowerCase();
        let data = await this.allProducts()
        if (az === "az") {
            let azName = data.sort(function (n1, n2) {
                return (n1.name > n2.name) ? 1
                    : (n2.name > n1.name) ? -1
                        : 0
            })
            return (azName)
        }
        if (az === "za") {
            let zaName = data.sort(function (n1, n2) {
                return (n1.name > n2.name) ? -1
                    : (n2.name > n1.name) ? 1
                        : 0
            })
            return (zaName)
        }

        return (`El value ${az} no esta seteado, revisalo e intenta nuevamente
            o dirijete a api/src/routes/filters.js linea 133 para mas detalles
            o contacta con el grupo de backend`)
    },

    money: async function (money) {
        money = money.toLowerCase();
        let data = await this.allProducts()
        if (money === "expensive") {
            let expensive = data.sort(function (p1, p2) {
                return p2.price - p1.price
            })
            return (expensive)
        }
        if (money === "cheap") {
            let cheap = data.sort(function (p1, p2) {
                return p1.price - p2.price
            })
            return (cheap)
        }

        return (`El value ${money} no esta seteado, revisalo e intenta nuevamente
            o dirijete a api/src/routes/filters.js linea 162 para mas detalles
            o contacta con el grupo de backend`)
    },

    age: async function (age) {
        age = age.toLowerCase();
        let data = await this.allProducts()
        if (age === "new") {
            let nuevo = data.sort(function (e1, e2) {
                return e2.year - e1.year
            })
            return (nuevo)
        }
        if (age === "old") {
            let viejo = data.sort(function (e1, e2) {
                return e1.year - e2.year
            })
            return (viejo)
        }
        return (`El value ${age} no esta seteado, revisalo e intenta nuevamente
            o dirijete a api/src/routes/filters.js linea 183 para mas detalles
            o contacta con el grupo de backend`)
    },

    rank: async function (rank) {
        //falta de terminar tal vez no quede lista esta funcionalidad
        //la idea es que reciba 2 numeros y busque entre esos rangos de precios
        rank = parseInt(rank)
        if (rank) {
            return ("Esta ruta aun no tiene asfalto, a donde creen que van?")
        }
    }


}


// //filtro por subcategoria de vinos (red, white & pink)
// router.get('/subcategory', async (req, res) => {

//     try {
//         let { type } = req.query
//         if (type) {
//             type = type.toLowerCase()
//             const subCategoria = await SubCategory.findAll({
//                 where: { type }
//             })
//             return (subCategoria) ? res.json(subCategoria)
//                 : res.status(404).json(`La subcategoria ${type} es inexistente en este ecomerce\nComuniquese con la gente del backend`)
//         }
//         const allsubcategorias = await SubCategory.findAll()
//         res.json(allsubcategorias)
//     }
//     catch (error) { res.status(404).json(error) }

// })


// //filtro por tipo de uvas ( hay seteadas 7)
// router.get('/grape', async (req, res) => {
//     try {
//         let { name } = req.query
//         if (name) {
//             name = firstUpperCase(name.toLowerCase())
//             const uva = await Grape.findAll({
//                 where: { name }
//             })
//             return (uva) ? res.json(uva)
//                 : res.status(404).json(`No tenemos existencias en nuestro catalogo del tipo de uva que estas buscando`)
//         }
//         const alluvas = await Grape.findAll()
//         res.json(alluvas)
//     }
//     catch (error) { res.status(404).json(error) }
// })