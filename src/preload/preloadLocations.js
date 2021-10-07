const { Location } = require('../db')

function preloadLocations() {
    const locations = [{
        show: false,
        name: "Center Point",
        coordsLat: -5.5387918,
        coordsLng: -74.8067453,
        center: true,
        zoom: 3.2,
        year: 2021,
        picture: "https://i.ibb.co/r7dQRBy/store.png",
        change: "Backend Admin",
        userId: "2ad58d4c-8c3b-41ec-a9ab-a0aa39a12c63",
        adress: "enviroment location",
        city: "for development purposes only",
        country: "development"
    },
    {
        name: "Empedocles México",
        coordsLat: 19.412935,
        coordsLng: -99.139009,
        center: false,
        zoom: 00,
        year: 2021,
        picture: "https://i.ibb.co/S0qTLM4/01.jpg",
        change: "Backend Admin",
        userId: "2ad58d4c-8c3b-41ec-a9ab-a0aa39a12c63",
        adress: "Fernando Ramirez e Isabela La Católica",
        city: "Ciudad de México",
        country: "México"
    },
    {
        name: "Empedocles Antioquia",
        coordsLat: 6.185310,
        coordsLng: -75.581152,
        center: false,
        zoom: 00,
        year: 2021,
        picture: "https://i.ibb.co/cJHc5Vp/04.jpg",
        change: "Backend Admin",
        userId: "2ad58d4c-8c3b-41ec-a9ab-a0aa39a12c63",
        adress: "carrera 46 & calle 20 sur",
        city: "Medellín",
        country: "Colombia"
    },
    {
        name: "Empedocles Perú",
        coordsLat: -12.046351,
        coordsLng: -77.028852,
        center: false,
        zoom: 00,
        year: 2021,
        picture: "https://i.ibb.co/LnJvZtG/02.png",
        change: "Backend Admin",
        userId: "2ad58d4c-8c3b-41ec-a9ab-a0aa39a12c63",
        adress: "Jirón Junín 291",
        city: "Cercado de Lima 15001",
        country: "Perú"
    },
    {
        name: "Empedocles Salta",
        coordsLat: -24.769924,
        coordsLng: -65.397987,
        center: false,
        zoom: 00,
        year: 2021,
        picture: "https://i.ibb.co/HdJDX8s/06.jpg",
        change: "Backend Admin",
        userId: "2ad58d4c-8c3b-41ec-a9ab-a0aa39a12c63",
        adress: "Av. Reyes Catolicos 1541",
        city: "Salta",
        country: "Argentina"
    },
    {
        name: "Empedocles Patio Olmos Shopping",
        coordsLat: -31.420017, 
        coordsLng: -64.188576,
        center: false,
        zoom: 00,
        year: 2021,
        picture: "https://i.ibb.co/GQzbw5t/05.jpg",
        change: "Backend Admin",
        userId: "2ad58d4c-8c3b-41ec-a9ab-a0aa39a12c63",
        adress: "Av. Vélez Sarsfield 361",
        city: "Córdoba",
        country: "Argentina"
    },
    {
        name: "Empedocles São Paulo",
        coordsLat: -23.602552,
        coordsLng:  -46.691003,
        center: false,
        zoom: 00,
        year: 2021,
        picture: "https://i.ibb.co/QrGwWfB/07.png",
        change: "Backend Admin",
        userId: "2ad58d4c-8c3b-41ec-a9ab-a0aa39a12c63",
        adress: "R. Taperoá 156",
        city: "São Paulo",
        country: "Brasil"
    },
    {
        name: "Empedocles La Plata",
        coordsLat: -34.933611, 
        coordsLng: -57.953728,
        center: false,
        zoom: 00,
        year: 2021,
        picture: "https://i.ibb.co/0Cx9vr0/03.jpg",
        change: "Backend Admin",
        userId: "2ad58d4c-8c3b-41ec-a9ab-a0aa39a12c63",
        adress: "Diagonal 74 2486",
        city: "La Plata - Buenos Aires",
        country: "Argentina"
    },
    {
        name: "Empedocles Quito",
        coordsLat: -0.181966,
        coordsLng:  -78.480073,
        center: false,
        zoom: 00,
        year: 2021,
        picture: "https://i.ibb.co/vmbpsYR/10.jpg ",
        change: "Backend Admin",
        userId: "2ad58d4c-8c3b-41ec-a9ab-a0aa39a12c63",
        adress: "Av. Portugal 1735",
        city: "Quito",
        country: "Ecuador"
    },
    {
        name: "Empedocles Casa Central",
        coordsLat: -34.593037, 
        coordsLng:  -58.428097,
        center: false,
        zoom: 00,
        year: 2021,
        picture: "https://i.ibb.co/zG4Y9K2/08.jpg",
        change: "Backend Admin",
        userId: "2ad58d4c-8c3b-41ec-a9ab-a0aa39a12c63",
        adress: "Raúl Scalabrini Ortiz 1295",
        city: "CABA",
        country: "Argentina"
    },
    {
        name: "🥳✨Proximamente Empedocles en Chile 🛒",
        coordsLat: -22.454692, 
        coordsLng:  -68.929242,
        center: false,
        zoom: 00,
        year: 2021,
        picture: "https://i.ibb.co/r7dQRBy/store.png",
        change: "Backend Admin",
        userId: "2ad58d4c-8c3b-41ec-a9ab-a0aa39a12c63",
        adress: "Av. Granaderos 2561",
        city: "Calama - Antofagasta",
        country: "Chile"
        
    }

];

    try {
        const newLocations = locations.map(async (s) => {
            return await Location.create({
                name: s.name,
                coordsLat: s.coordsLat,
                coordsLng: s.coordsLng,
                center: s.center,
                zoom: s.zoom,
                year: s.year,
                picture: s.picture,
                change: s.change,
                userId: s.userId,
                adress: s.adress,
                city: s.city,
                country: s.country
            })
        })

        return Promise.all(newLocations)
    } catch (error) {
        return console.log(error)
    }
}

module.exports = preloadLocations;