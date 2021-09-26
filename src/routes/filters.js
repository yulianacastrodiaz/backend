'use strict ';


const { Product } = require('../db')
const { Category } = require('../db')

module.exports = {


    allProducts: async function () {
        let prod = await Product.findAll()
        return prod
    },

    category: async function(category){
        let data = await this.allProducts()
        const categoryDB = await Category.findOne({ where: {name: categoryDB}})
        if(categoryDB){
           let allProducts = data.filter(p => p.categoryId === categoryDB.id)
           return allProducts;
        } else {
            return "Esta categoría no existe"
        }
    },

    name: async function (name) {
        let data = await this.allProducts()
        const nombre = data.filter(p => p.name.includes(name))
        return (nombre.length > 0) ? (nombre)
            : (`En nuestro catalogo no existen productos que coincidan con el termnino ${nombre}`)
    },

    id: async function (id) {
        let byId = await Product.findByPk(id)
        return (byId) ? (byId)
            : (`No tenemos existencia de un producto con ${id} como id`)
    },

    brand: async function (brand) {
        let data = await this.allProducts()
        const marca = data.filter(p => p.brand.includes(brand))
        return (marca.length > 0) ? (marca)
            : (`En nuestro catalogo no existen productos que coincidan con la marca ${brand}`)
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

    stock: async function (stock) {
        let data = await this.allProducts()
        stock = parseInt(stock)
        if (typeof stock !== "number") { return `El stock ${stock} ingresado no es del tipo numerico` }
        let byStock = data.filter(p => p.stock === stock)
        return (byStock.length > 0) ? (byStock)
            : (`No encontramos coincidencia exacta de un producto con el stock ${stock}`)

    },

    azName: async function (azName) {
        azName = azName.toLowerCase();
        let data = await this.allProducts()
        if (azName === "az") {
            let azNombre = data.sort(function (n1, n2) {
                return (n1.name > n2.name) ? 1
                    : (n2.name > n1.name) ? -1
                        : 0
            })
            return (azNombre)
        }
        if (azName === "za") {
            let zaNombre = data.sort(function (n1, n2) {
                return (n1.name > n2.name) ? -1
                    : (n2.name > n1.name) ? 1
                        : 0
            })
            return (zaNombre)
        }

        return (`El value ${az} no esta seteado, revisalo e intenta nuevamente
            o dirijete a api/src/routes/filters.js linea 80 para mas detalles
            o contacta con el grupo de backend`)
    },

    azBrand: async function (az) {
        az = az.toLowerCase();
        let data = await this.allProducts()
        if (az === "az") {
            let azBrand = data.sort(function (n1, n2) {
                return (n1.brand > n2.brand) ? 1
                    : (n2.brand > n1.brand) ? -1
                        : 0
            })
            return (azBrand)
        }
        if (az === "za") {
            let zaBrand = data.sort(function (n1, n2) {
                return (n1.brand > n2.brand) ? -1
                    : (n2.brand > n1.brand) ? 1
                        : 0
            })
            return (zaBrand)
        }

        return (`El value ${az} no esta seteado, revisalo e intenta nuevamente
            o dirijete a api/src/routes/filters.js linea 105 para mas detalles
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
            o dirijete a api/src/routes/filters.js linea 130 para mas detalles
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
            o dirijete a api/src/routes/filters.js linea 151 para mas detalles
            o contacta con el grupo de backend`)
    },

    stockSort: async function (stock) {
        stock = stock.toLowerCase();
        let data = await this.allProducts()
        if (stock === "more") {
            let mas = data.sort(function (e1, e2) {
                return e2.stock - e1.stock
            })
            return (mas)
        }
        if (stock === "less") {
            let menos = data.sort(function (e1, e2) {
                return e1.stock - e2.stock
            })
            return (menos)
        }
        return (`El value ${stock} no esta seteado, revisalo e intenta nuevamente
            o dirijete a api/src/routes/filters.js linea 171 para mas detalles
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