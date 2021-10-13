const { Location } = require('../db')

async function setCenterLocations() {
    try {
        const center = await Location.findOne({ where: { name: "Center Point" } });
        center.show = false;
        await center.save(['show'])
    } catch (error) {
        return console.log(error)
    }
}

module.exports = setCenterLocations;