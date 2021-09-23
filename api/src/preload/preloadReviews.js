const { Review } = require('../db')

function preloadReviews(){
  const reviews = [{
    comment: "Debo señalar que hasta el momento, algunas botellas vinieron con sedimento, por lo cual no puedo saber aún como será el resto del total de 18 botellas adquiridas. En principio no tiene la calidad que el producto cafayate suele esgrimir. No puedo calificarlo malo, debiera haber la opción regular y esa sería mi opinón.",
    start: 2,
  },{
    comment: "¡Rico! precio / calidad para aprovechar.Un vino liviano y rico. Me sorprendió gratamente. Uno de los mejores vinos económicos en este",
    start: 5,
  },{
    comment:"Hay mejores vinos. Pero este malbec, me es útil para cocinar carnes, y otros usos en la cocina. No es malo, pero para tomar poniendo algunos pesos más, se puede tomar un malbec mendocino, que en general, son mejores que los salteños. Por ahora",
    start: 3,
  },{
    comment: "Esplendido. Hace muchos años que lo tomo y espero seguir muchos mas, tiene buen color, buen gusto, me encanta la botella y la caja, ademas tengo un botellon de 4,5 litros que compre abordo de un crucero y es precioso, ademas lo probe en 1952 en un buque americano y ya no lo deje, habiendo probado varios distintos wyskies-.",
    start: 5,
  },]

  try {
    const newReviews = reviews.map(async(r) => {
      return await Review.create({
        comment: r.comment,
        start: r.start
      })
    })
  
   return Promise.all(newReviews)
  } catch (error) {
    return console.log(error)
  }
}

module.exports = preloadReviews;