const { Router } = require('express');
const router = Router();
const { Location } = require('../db')
const { User } = require('../db')
const filtrar = require('../routes/filters')


const firstUpperCase = function (mayus) { return mayus.replace(/\b\w/g, l => l.toUpperCase()) }

//agregar sucursal
router.post('/', async (req, res) => {
    let { name, coordsLat, coordsLng, center, zoom, year, picture, userid, adress, city, country } = req.body;

    if (!userid) { return res.status(404).json(`Debe especificar un userid para acceder a esta ruta`) }
    if (!name) { return res.status(404).json(`Debe especificar un nombre para esta sucursal`) }
    if (!adress) { return res.status(404).json(`Debe especificar una direccion para esta sucursal`) }
    if (!city) { return res.status(404).json(`Debe especificar una ciudad para esta sucursal`) }
    if (!country) { return res.status(404).json(`Debe especificar un país para esta sucursal`) }
    if (!coordsLat) { return res.status(404).json(`Debe especificar una latitud para esta sucursal`) }
    if (!coordsLng) { return res.status(404).json(`Debe especificar una longitud para esta sucursal`) }
    //comprobaciones
    name = firstUpperCase(name.toLowerCase())
    adress = firstUpperCase(adress.toLowerCase())
    city = firstUpperCase(city.toLowerCase())
    country = firstUpperCase(country.toLowerCase())

    // ^-?([1-8]?\d(?:\.\d{1,})?|90(?:\.0{1,6})?)$
    //^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$
    coordsLat = coordsLat.replace(/,/g, ".");
    if (!(/^-?([1-8]?\d(?:\.\d{1,})?|90(?:\.0{1,6})?)$/.test(coordsLat))) {
        return res.status(404).json(`Revisar el campo de coordsLat, (${coordsLat}) no cumple los requerimientos  ej: ± xx.1234567`)
    }
    console.log("latitud ok")
    // ^-?((?:1[0-7]|[1-9])?\d(?:\.\d{1,})?|180(?:\.0{1,})?)$

    // ^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$
    coordsLng = coordsLng.replace(/,/g, ".");
    if (!(/^-?((?:1[0-7]|[1-9])?\d(?:\.\d{1,})?|180(?:\.0{1,})?)$/.test(coordsLng))) {
        return res.status(404).json(`Revisar el campo de coordsLng, (${coordsLng}) no cumple los requerimientos ej: ± xx.1234567`)
    }
    console.log("longitud ok")


    if (center) {
        return (typeof center === 'boolean') ? console.log(`center ok`)
            : res.status(404).json(`center solo admite valores booleanos (true || false)`)
    }

    if (!center) { center = false }

    if (zoom) {
        return (typeof zoom === 'number') ? console.log(`zoom ok`)
            : res.status(404).json(`zoom solo admite valores numericos (acepta decimales)`)
    }
    if (!zoom) { zoom = 00 }

    if (year) {
        return (typeof year === 'number') ? console.log(`year ok`)
            : res.status(404).json(`year solo admite valores numericos `)
    }
    if (!year) { year = 00 }

    if (!picture) { picture = "https://i.ibb.co/r7dQRBy/store.png" }

    try {
        let userFind = await User.findOne({
            where: { id: userid },
            attributes: ['name', 'lastname', 'isAdmin']
        })

        if (userFind === null) { return res.status(404).json(`El userid utilizado no existe dentro de nuestros registros`) }

        let userName = userFind.dataValues.name;
        let userLastname = userFind.dataValues.lastname;
        let userAdmin = userFind.dataValues.isAdmin;
        let fullName = `${userName} ${userLastname}`;

        if (userAdmin === true) {

            console.log(`Bienvenido ${userName}! Posees credenciales de administrador `)

            const newMarket = await Location.create({
                name: name,
                coordsLat: coordsLat,
                coordsLng: coordsLng,
                center: center,
                zoom: zoom,
                year: year,
                picture: picture,
                change: fullName,
                userId: userid,
                adress: adress,
                city: city,
                country: country

            })

            return res.json(`La sucursal se agrego de manera exitosa`)
        }
        return res.status(404).json(`No puedes realizar cambios con el nivel de credencial de tu usuario, verifique que el userid sea Admin`)

    } catch (error) {
        res.status(404).send({ "Verifique los datos enviados": await error });
    }


})

//obtener listado de sucursales y filtrados
router.get('/', async (req, res) => {
    let { country, city, storeId, name, userId } = req.query
    try {
        if (name) {
            name = firstUpperCase(name.toLowerCase())
            let nombre = await filtrar.locationName(name)
            return (nombre) ? res.json(nombre)
                : res.status(404).json(`no se encontraron coincidencias con el termino ${name}`)
        }

        if (country) {
            country = firstUpperCase(country.toLowerCase())
            let pais = await filtrar.locationCountry(country)
            return (pais) ? res.json(pais)
                : res.status(404).json(`no se encontraron coincidencias con el termino ${country}`)
        }

        if (city) {
            let city = firstUpperCase(city.toLowerCase())
            let ciudad = await filtrar.locationCity(city)
            return (ciudad) ? res.json(ciudad)
                : res.status(404).json(`no se encontraron coincidencias con el termino ${city}`)
        }

        if (storeId) {
            let sucursal = await filtrar.locationId(storeId)
            return (sucursal) ? res.json(sucursal)
                : res.status(404).json(`no se encontraron sucursales que coincidan con el id ${storeId}`)
        }

        if (userId) {
            let userId = firstUpperCase(userId.toLowerCase())
            let user = await filtrar.locationUser(userId)
            return (user) ? res.json(user)
                : res.status(404).json(`no se encontraron coincidencias con el termino ${userId}`)
        }

        const all = await filtrar.allPlace()
        if (all) {
            return res.json(all)
        } else {
            return res.status(404).json(all)
        }
    } catch (error) {
        res.status(404).send({ "Verifique los query's enviados": await error });
    }

})

//actualizar sucursales (requiere userid [admin] (por body) & id de sucursal (por params))
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    let { name, coordsLat, coordsLng, center, zoom, year, picture, userid, adress, city, country } = req.body;

    if (coordsLat) {
        coordsLat = coordsLat.replace(/,/g, ".");
        if (!(/^-?([1-8]?\d(?:\.\d{1,})?|90(?:\.0{1,6})?)$/.test(coordsLat))) {
            return res.status(404).json(`Revisar el campo de coordsLat, (${coordsLat}) no cumple los requerimientos  ej: ± xx.1234567`)
        }
        console.log("latitud ok")
    }

    if (coordsLng) {
        coordsLng = coordsLng.replace(/,/g, ".");
        if (!(/^-?((?:1[0-7]|[1-9])?\d(?:\.\d{1,})?|180(?:\.0{1,})?)$/.test(coordsLng))) {
            return res.status(404).json(`Revisar el campo de coordsLng, (${coordsLng}) no cumple los requerimientos ej: ± xx.1234567`)
        } console.log("longitud ok")
    }

    let f5 = [];
    try {
        if (id) {
            const existe = await Location.findOne({ where: { id } })
            if (existe === null) { return res.status(404).json(`El Id ${id} no coincide con ninguna sucursal`) }

            let userFind = await User.findOne({
                where: { id: userid },
                attributes: ['name', 'lastname', 'isAdmin']
            })

            if (userFind === null) { return res.status(404).json(`El userid utilizado no existe dentro de nuestros registros`) }


            let userAdmin = userFind.dataValues.isAdmin;
            let fullName = `${userFind.dataValues.name} ${userFind.dataValues.lastname}`
            if (userAdmin === true) {
                console.log(`Bienvenido ${fullName}! Posees credenciales de administrador `)

                if (name) {
                    name = firstUpperCase(name.toLowerCase())
                    existe.name = name
                    f5.push('name')
                }
                if (coordsLat) {
                    existe.coordsLat = coordsLat
                    f5.push('coordsLat')
                }
                if (coordsLng) {
                    existe.coordsLng = coordsLng
                    f5.push('coordsLng')
                }
                if (center) {
                    if (typeof center !== 'boolean') { return res.status(404).json(`center solo admite valores booleanos (true || false)`) }
                    existe.center = center
                    f5.push('center')
                }
                if (zoom) {
                    if (typeof zoom !== 'number') { return res.status(404).json(`zoom solo admite valores numericos (acepta decimales)`) }
                    existe.zoom = zoom
                    f5.push('zoom')
                }
                if (year) {
                    existe.year = year
                    f5.push('year')
                }
                if (picture) {
                    existe.picture = picture
                    f5.push('picture')
                }
                if (userid) {
                    existe.userId = userid
                    f5.push('userid')
                }
                if (adress) {
                    adress = firstUpperCase(adress.toLowerCase())
                    existe.adress = adress
                    f5.push('adress')
                }
                if (city) {
                    city = firstUpperCase(city.toLowerCase())
                    existe.city = city
                    f5.push('city')
                }
                if (country) {
                    country = firstUpperCase(country.toLowerCase())
                    existe.country = country
                    f5.push('country')
                }
                existe.change = fullName

                await existe.save(f5)

                return res.json(`La sucursal se modifico de acuerdo a los parametros recibidos de manera exitosa`)
            }
            return res.status(404).json(`No puedes realizar cambios con el nivel de credencial de tu usuario, verifique que el userid sea Admin`)

        }

    } catch (err) { res.status(404).json(`Debe especificarse un Id para llevar a cabo la actualizacion: ${err}`) }
})

// eliminar una sucursal requiere userid [admin] (por body) & id de sucursal (por params))
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { userid } = req.body;

    try {
        if (id) {

            const existe = await Location.findOne({ where: { id } })
            if (existe === null) { return res.status(404).json(`No se encontro una sucursal con el Id ${id}`) }

            let userFind = await User.findOne({
                where: { id: userid },
                attributes: ['name', 'lastname', 'isAdmin']
            })

            if (userFind === null) { return res.status(404).json(`El userid utilizado no existe dentro de nuestros registros`) }

            let fullName = `${userFind.dataValues.name} ${userFind.dataValues.lastname}`;
            let userAdmin = userFind.dataValues.isAdmin;

            if (userAdmin === true) {
                console.log(`Bienvenido ${fullName}! Posees credenciales de administrador `)

                existe.show = false;
                existe.change = fullName;
                existe.userId = userid;

                await existe.save(['show', 'change', 'userId'])

                return res.send('La sucursal fue eliminada de manera satisfactoria');
            }
            return res.status(404).json(`No puedes realizar cambios con el nivel de credencial de tu usuario, verifique que el userid sea Admin`)
        }
    } catch (error) {
        res.status(404).send(`Ocurrio un error al intentar eliminar, corrobore el id;${error}`);
    }
})

module.exports = router