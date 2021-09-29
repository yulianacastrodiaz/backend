const { Review } = require('../db')

function preloadReviews(){
  const reviews = [{
    comment: "Debo señalar que hasta el momento, algunas botellas vinieron con sedimento, por lo cual no puedo saber aún como será el resto del total de 18 botellas adquiridas. En principio no tiene la calidad que el producto cafayate suele esgrimir. No puedo calificarlo malo, debiera haber la opción regular y esa sería mi opinón.",
    stars: 2,
  },{
    comment: "¡Rico! precio / calidad para aprovechar.Un vino liviano y rico. Me sorprendió gratamente. Uno de los mejores vinos económicos en este",
    stars: 5,
  },{
    comment:"Hay mejores vinos. Pero este malbec, me es útil para cocinar carnes, y otros usos en la cocina. No es malo, pero para tomar poniendo algunos pesos más, se puede tomar un malbec mendocino, que en general, son mejores que los salteños. Por ahora",
    stars: 3,
  },{
    comment: "Esplendido. Hace muchos años que lo tomo y espero seguir muchos mas, tiene buen color, buen gusto, me encanta la botella y la caja, ademas tengo un botellon de 4,5 litros que compre abordo de un crucero y es precioso, ademas lo probe en 1952 en un buque americano y ya no lo deje, habiendo probado varios distintos wyskies-.",
    stars: 5,
  },{
    comment: "Esplendido. Hace muchos años que lo tomo y espero seguir muchos mas, tiene buen color, buen gusto, me encanta la botella y la caja, ademas tengo un botellon de 4,5 litros que compre abordo de un crucero y es precioso, ademas lo probe en 1952 en un buque americano y ya no lo deje, habiendo probado varios distintos wyskies-.",
    stars: 5,
  },{
    comment: "Excelente, Un whiskaso, de esos que te vuelan la capocha y decís uepa! pega durazno como pase del diegote y amaneces en al otro día en jose c paz. Como mi novia que era de jose c paz. Te extraño volve antonela, no te engaño mas.",
    stars: 5,
  },{
    comment: "Me quedo con el jameson o el johnny walker red label y se consigue 800 o el mejor el jack daniels. Aclaremos de los de medio pelo. Este parece un blenders! y lo que me paració raro es que la botella sobresale del estuche de carton. Me da desconfianza.",
    stars: 2,
  },{
    comment: "Un pack de rutini único con dos vinos muy buenos como el cabernet-malbec y el malbec los dos cosecha 2018 y el sauvignon blanc cosecha 2020. En boca y nariz los dos tintos tienen un cuerpo complejo y las notas que le saque fueron especias y frutas rojas muy rico la verdad, recomendables para acompañar con asado. Y el blanco muy bueno y fresco y se le sienten notas de frutas tropicales recomiendo acompañar con pescado.",
    stars: 5,
  },{
    comment: "Muy buen producto. Prolijamente presentado, realmente es para quedar muy bien como regalo para una ocasión especial.",
    stars: 5,
  },{
    comment: "Todo excelente! de lo mejor de la gama trumpeter.",
    stars: 5,
  },{
    comment: "Un clasico que no tiene competidores, Cualquier otro vino debe compararse con este, que en la relación calidad precio es insuperable. Si ustedes hacen una prueba a ciegas este va a estar entre los tres finalistas, hoy cuesta un dólar la botella.",
    stars: 5,
  },{
    comment: "Es un vino fresco, agradable de tomar. Liviano, para acompañar comida con pescados o mariscos, también empanadas. Está trabajado como un vino del rin y extraño los sabores frutales de esta cepa.",
    stars: 4,
  },{
    comment: "Vino torrontés frutado, riquísimo. Para mi gusto el mejor torrontés salteño.",
    stars: 5,
  },{
    comment: "Muy buen vino, ideal para tomarlo en reuniones bien fresco, lo vengo comprando desde ya hace un tiempo",
    stars: 5,
  },{
    comment: "Bueno , dulce esta de acuerdo al valor.",
    stars: 3,
  },{
    comment: "Aclaro que no soy un entendido en el tema, pero esta versión de caskmates ipa es una gran entrada al mundo de los whiskeys. Por muy buen precio y lo considero suave en comparación con la versión stout. Es quien me acompaña durante este invierno.",
    stars: 5,
  }]

  try {
    const newReviews = reviews.map(async(r) => {
      return await Review.create({
        comment: r.comment,
        stars: r.stars
      })
    })
  
   return Promise.all(newReviews)
  } catch (error) {
    return console.log(error)
  }
}

module.exports = preloadReviews;