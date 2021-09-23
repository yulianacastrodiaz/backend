//cloudinary
const cloudinary = require('cloudinary')
const { api_key, api_secret, api_name } = process.env

cloudinary.config({ 
    cloud_name: api_name, 
    api_key: api_key, 
    api_secret: api_secret 
  });
  const a = require('../img/')
  cloudinary.v2.uploader.upload("../img/JW18.jpg",
    { public_id: "wjw18" }, 
    function(error, result) {console.log(result); 
  });