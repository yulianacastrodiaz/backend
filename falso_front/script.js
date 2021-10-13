
let marketAll = []
let centro = [];

function cargarSucursales() {
  fetch('http://localhost:3001/map')
    .then(r => r.json())
    .then(data => {
      centro.push(data.filter(t => t.center === true));
      data.filter(t => t.show === true).map(t => {
        let market = {
          position: { lat: Number(t.coordsLat), lng: Number(t.coordsLng) },
          title: t.name
        }
        marketAll.push(market)
      })
    }).catch(err => { console.log("fallo la carga de sucursales", err) })

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(userPosition => {
      let userPoint = {
        lat: userPosition.coords.latitude,
        lng: userPosition.coords.longitude,
      }
      cargarSucursales()
      renderMapUser(userPoint)
    }, () => {
      console.log("Se desactivo la ubicacion del usuario");

      /* let gps = {
        lat: Number(centro[0][0].coordsLat),
        lng: Number(centro[0][0].coordsLng),
      }; */
      let gps = {
        lat: -5.5387918,
        lng: -74.8067453,
      };
      renderMapUser(gps)
    })
  }

  /* async function showError(error) {
    console.log(centro)
    let gps = await {
      lat: Number(centro[0][0].coordsLat),
      lng: Number(centro[0][0].coordsLng),
    }
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("User denied the request for Geolocation."),
          await renderMapUser(gps)
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("Location information is unavailable."),
          renderMapUser(gps)
        break;
      case error.TIMEOUT:
        console.log("The request to get user location timed out."),
          renderMapUser(gps)
        break;
      case error.UNKNOWN_ERROR:
        console.log("An unknown error occurred."),
          renderMapUser(gps)
        break;
      default:
        console.log("Error no especificado"),
          renderMapUser(gps)
    }
  } */


  async function renderMapUser(gps) {

    let mapita = new google.maps.Map(document.getElementById('map'), {
      center: gps,
      zoom: 3.2
    })

    let sucursales = await marketAll.map(p => {
      return new google.maps.Marker({
        position: p.position,
        title: p.title,
        map: mapita
      })
    })

  }
}

cargarSucursales()