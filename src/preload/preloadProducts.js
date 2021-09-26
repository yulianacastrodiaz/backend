const { Product } = require('../db')

function preloadProducts(){
  const products = [{
    name: "El Enemigo",
    description: 'Este tinto es elaborado en Gualtallary. Provincia de Mendoza, Argentina. \n' + 
                  'Cuenta con una crianza de 14 meses en barricas de roble francés. \n' +
                  'En vista presenta un rojo rubí de alta intensidad y destellos violáceos. \n' +
                  'Su aroma es un ataque brutal al paladar. Posee muy buen equilibrio y acidez con taninos muy marcados. \n'+
                  'Blend: 89% Malbec - 11% Petit Verdot',
    brand:"El Enemigo",
    price: 1950, 
    year:2019,
    rating:0,
    stock:60,
    picture:"https://res.cloudinary.com/wineec/image/upload/v1632240426/El-enemigo-malbec.jpg"
  },{
    name: "Johnnie Walker 18 años",
    description: 'Johnnie Walker 18 Años fue inspirado por la tradición de John Walker & Sons ' +
                 'de regalar blends privados a un círculo cercano de amigos de la familia. \n' +
                 'Mezclado con whiskies que se han añejado por mínimo 18 años, combina notas ' +
                 'sofisticadas y contemporáneas con sabores clásicos de Johnnie Walker. \n' + 
                 'Cuando quieras hacer de una ocasión especial algo excepcional, Johnnie Walker 18 Años ' +
                 'es la elección perfecta.',
    
    brand:"Johnnie Walker",
    price:12.000,
    year:2004,
    rating:0,
    stock:10,
    picture:"https://res.cloudinary.com/wineec/image/upload/v1632241219/jw18.jpg"
  },{
    name: "Johnnie Walker Double Black",
    description: 'Johnnie Walker Double Black fue creado omo una versión más oscura y ahumada ' +
                 'del mundialmente famoso Johnnie Walker Black Label. ' + 
                 'La mezcla es madurada en barricas carbonizadas y usa una mayor proporción de ' + 
                 'whiskies potentes de la Costa oeste y las Islas para elevar los sabores icónicos ' +
                 'a un nuevo nivel de intensidad.',  
    brand:"Johnnie Walker",
    price:3750,
    year:2015,
    rating:0,
    stock:20,
    picture:"https://res.cloudinary.com/wineec/image/upload/v1632241267/jwdb.jpg"
  },{
    name: 'Johnnie Walker Green Label',
    description: 'Whisky de  15 años. Green Label de Johnnie Walker es una mezcla de Single Malts, ' + 
                 'no un whisky Blended (Single Malts con Single Grains).',
    brand:'Johnnie Walker',
    price:8500,
    year:2016,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632241303/jwgl.jpg'
  },{
    name: 'Chivas Regal Mizunara',
    description: 'Botella de 700cc. Un excelente producto por su relación calidad/precio. Ideal para regalo',
    brand:'Chivas Regal',
    price:5900,
    year:2018,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632240196/Chivas%20Regal%20Mizunara.webp'
  },{
    name: `The Glenlivet Founders Reserve`,
    description: 'Botella de 750cc. Representando el estilo característico de The Glenlivet, esta malta ' +
                 'clásica se madura primero en roble europeo ex-jerez, antes de pasar tiempo en barricas ' +
                 'de roble americano ex-bourbon que imparten notas de vainilla y le dan al whisky su suavidad ' +
                 'distintiva.',
    brand:'The Glenlivet',
    price:5100,
    year:2020,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632247903/The%20Glenlivet%20Founders%20Reserve.webp'
  },{
    name: "Fow Castizo",
    description: 'Color rojo violenta brillante y vivaz. Aromas especiados vibrantes típicos del varietal, ' +
                 'que recuerdan a pimiento rojo, pimienta y leves sensaciones de regaliz. De gran volumen ' +
                 'en boca, balanceado, fresco y de buena acidez, Final persistente complejo, con las ' + 
                 'características auténticas de un gran Cabernet Franc.',
    brand:"Bodega Fow",
    price:572,
    year:2019,
    rating:0,
    stock:20,
    picture:"https://res.cloudinary.com/wineec/image/upload/v1632240570/fow-castizo-cabernet-franc.webp"
  },{
    name: "Puna Reserva",
    description:  'Producido en Cachi - Salta a 2.600 mts de altura. Crianza: 12 meses en barrica de roble. ' +
                  'Notas de Cata: Este vino es de característica compleja con diferentes planos aromáticos, ' +
                  'el primer plano es de aromas frutados, recuerdo de frutos rojos maduros como ciruela , ' + 
                  'y negros como casis, alternando con un segundo plano de cerezas en confitura, para ' +
                  'expresar luego el tercer plano con recuerdo de regaliz, aromas tostados suave y elegantes ' +
                  'aportados por su paso en roble durante 12 meses.',
    brand:"Bodega Puna",
    price:1190,
    year:2018,
    rating:0,
    stock:20,
    picture:"https://res.cloudinary.com/wineec/image/upload/v1632244045/puna-reserva-malbec.webp"
  },{
    name: 'Sapere',
    description: 'Producido en Valle de Uco, Mendoza. A la vista se muestra con tonos rojos violáceos ' +
                'intensos y en los aromas se destacan los tostados y chocolates aportados por el paso en ' +
                'madera. Asimismo, se presentan notas de fruta fresca como ciruela y guinda.',
    brand:'Bodega Valle de Encuentro',
    price:860,
    year:2020,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632244315/sapere-malbec.webp'
  },{
    name: 'Salentein Numina Cabernet Franc',
    description: 'Rojo con tonalidades bordo de buena intensidad y limpidez. Aroma, de mucha expresión y ' +
                 'tipicidad varietal, crema de cassis, arándanos, especies tales como el clavo de olor. ' +
                 'En la boca se sienten taninos maduros, dulces y redondos, amplio y untuoso en la media boca ' +
                 'muy persistente.',
    brand:'Salentein',
    price:1350,
    year:2019,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632244159/salentein-numina-cabernet-franc..jpg'
  },{
    name: 'Andeluna Elevación',
    description: 'Un Red Blend de Merlot, Malbec y Cabernet Sauvignon, con taninos sedosos y prolongados ' +
                'con gran final de boca.',
    brand:'Bodega Andeluna',
    price:790,
    year:2020,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632240105/andeluna-elevacion-blend.webp'
  },{
    name: 'Torrontés Cafayate Gran Linaje',
    description: 'Se trata de un ejemplar muy aromático, floral por sus notas a jazmín y geranios y con ' +
                 'toques de frutos cítricos, con cuerpo, pero sumamente fresco y vivaz.',
    brand:'Bodega Etchart',
    price:870,
    year:2020,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632248003/torrontes-cafayate.webp'
  },{
    name: 'Mendel Rosadia',
    description: 'Blend rosado de edición limitada donde fusiona Pinot Noir, Cabernet Franc y Merlot',
    brand:'Bodega Mendel',
    price:1700,
    year:2020,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632243891/mendel-rosadia.webp'
  },{
    name: 'Casa Ambrosia Sauvignon Blanc',
    description: 'Es un vino que puede disfrutarse todos los días. Fue elaborado con uvas de gran calidad procedentes de los ' +
                 'viñedos de Gualtallary.',
    brand:'Finca Ambrosia',
    price:850,
    year:2020,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632235182/ambrosia-sauvignon-blanc.jpg'
  },{
    name: 'Tacuil RD Sauvignon Blanc',
    description: 'Su intensidad aromática es sobresaliente, notas cítricas y sutiles aromas a frutas blancas. En boca se muestra ' + 
                 'con una acidez muy agradable que aporta una excelente frescura. Gran elegancia y persistencia.',
    brand:'Bodega Tacuil',
    price:1500,
    year:2019,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632244352/tacuil-rd-sauvignon-blanc.jpg'
  },{
    name: 'Tinto Negro Uco Valley Rose',
    description: 'Malbec cosechado temprano para ser rosado. Fermentación con levaduras naturales. Color rosado intenso y ' +
                 'brillante. Aromas de frutos rojos, frambuesas y cerezas con leve dejo floral.',
    brand:'Bodega Tinto negro',
    price:940,
    year:2020,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632247966/tinto-negro-uco-valley-rose.jpg'
  },{
    name: 'La Posta Rosé de Malbec',
    description: 'De color rosa salmón elegante. Flor de cerezo, granada, notas cítricas en nariz con sensación en boca fresca, delicada y compleja.',
    brand:'Bodega La Posta By Laura Catena',
    price:1100,
    year:2020,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632241455/la-posta-rose-de-malbec.jpg'
  },{
    name: 'Bressia Sylvestra Pinot Noir Rosé',
    description: 'Un vino rosado refrescante y ligero, con uvas del Valle de Uco . De color rosado con reflejos cobrizos brillantes y ' +
                 'muy frutal. Se perciben hierbas silvestres, que aportan frescura y un matiz cítrico, que recuerda a pomelo y lima. ' +
                 'En boca es frutal, muy equilibrado y sabroso.',
    brand:'Bodega Bressia',
    price:1050,
    year:2020,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632240153/bressia-sylvestra-pinot-noir-rose.jpg'
  },{
    name: 'Manos Negras Chardonnay',
    description: 'Chardonnay con un perfil aromático de frutos de carozo, recuerdos cítricos y notas de piña madura. ' +
                 'En boca es fresco y equilibrado, de agradable paso por el paladar, un blanco para todos los días.',
    brand:'Bodega Manos Negras',
    price:750,
    year:2020,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632241673/manos-negras-chardonnay.jpg'
  },{
    name: 'Potrero Chardonnay',
    description: 'Es de cuerpo medio a completo, con una acidez brillante y una textura cremosa',
    brand:'Bodega Vinos de Potrero',
    price:850,
    year:2020,
    rating:0,
    stock:30,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632243957/potrero-chardonnay.jpg'
  },{
    name: 'Trivento Golden Reserve Chardonnay',
    description: 'Este chardonnay es una mezcla de viñedos en Tupungato y Los Sauces, ambas en el Valle de Uco, al sur de Mendoza ' + 
                 'y a los pies de la cordillera de los Andes. La crianza se prolonga por 14 meses en fudres de madera ya usada. ',               
    brand:'Bodega Trivento',
    price:1100,
    year:2019,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632248034/trivento-golden-reserve-chardonnay.jpg'
  },{
    name: 'Andeluna 1300 Cabernet Sauvignon',
    description: 'La bodega está ubicada en el terruño rocoso de Gualtallary, Mendoza, a más de 1300 metros sobre el nivel del mar, ' +
                 'al pie de la Cordillera de Los Andes. Un entorno perfecto para la producción de vinos complejos y de calidad.' +
                 'Color rojo intenso con matices bordó. En nariz, se destacan principalmente notas especiadas como pimienta blanca y ' +
                 'clavo de olor. En boca, principalmente posee un balance tánico destacado que lo hace grato al beber. Las notas ' +
                 'especiadas perduran en el final.',
    brand:'Bodega Andeluna',
    price:730,
    year:2019,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632240048/andeluna-1300-cabernet-sauvignon.jpg'
  },{
    name: 'Marchiori & Barraud Cabernet Sauvignon',
    description: 'Un cabernet amable y jugoso en boca con taninos firmes, maduros y vibrante acidez. La madera le aporta ' +
                 'estructura y aromas dejando en primer plano a la fruta y a la frescura. Es muy balanceado en el final y deja ' +
                 'un persistente recuerdo. Buen compañero de quesos duros, carnes rojas de cocción larga y guisos.',
    brand:'Bodega Marchiori & Barraud',
    price:930,
    year:2020,
    rating:0,
    stock:36,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632241747/marchiori-barraud-cabernet-sauvignon.jpg'
  },{
    name: 'Tensión la Ribera Blend',
    description: 'Este es un 90% de malbec y un 10% de petit verdot, un blend lleno de frutas maduras. El malbec es el que ofrece ' +
                 'las frutas, la suavidad, las notas herbales, la suculencia de una uva madura sin exagerar. El petit verdot aporta ' +
                 'los taninos, la acidez y también un cierto lado rústico que apoya y contrasta con el dulzor de la fruta. Un vino ' +
                 'para beberlo ahora con embutidos. Es macerado durante veinte días sobre los orujos y criado en barricas de roble ' +
                 'francés de primer, segundo y tercer uso durante 10 meses.',
    brand:'Bodega Santa Julia Blend',
    price:790,
    year:2020,
    rating:0,
    stock:40,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632247867/tension-la-ribera-blend.jpg'
  },{
    name: 'La Danza Blend',
    description: 'Rico blend de uvas tintas con un refrescante porcentaje de uvas blancas. Es un vino de placer y muy fácil de beber. ' +
                 'Muestra un color rojo rubí intenso con tintes violáceos, brillante En boca es estructurado, equilibrado, ' +
                 'con una entrada en la que la acidez despierta los sentidos y nos deja con ganas de un segundo sorbo. Sus taninos ' +
                 'son delicados y tiene un final largo y muy frutado. Es un excelente acompañamiento de platos de comida mediterránea, ' +
                 'especialmente aquellos a base de berenjenas y tomate, pero también puede ser disfrutado solo.',
    brand:'Bodega Altos Las Hormigas',
    price:840,
    year:2019,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632241365/la-danza-blend.jpg'
  },{
    name: 'Colonia las Liebres Bonarda',
    description: 'Pionero de la Bonarda Argentina moderna. Es un vino sin maduración en roble, jugoso y especiado, que ' +
                 'logra un equilibrio entre frescura y fruta.',
    brand:'Bodega Altos Las Hormigas',
    price:780,
    year:2020,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632311184/colonia-las-liebres-bonarda.jpg'
  },{
    name: 'Trivento White Malbec',
    description: 'El Trivento White Malbec es un vino hecho como blanco, es decir, sin que el jugo tenga un contacto prolongado ' +
                 'con las pieles de las uvas, que es donde yace el color. El cuerpo es ligero ideal para el aperitivo.',
    brand:'Bodega Trivento',
    price:550,
    year:2021,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632248092/trivento-white-malbec.jpg'
  },{
    name: 'Via Revolucionaria Bonarda Pura',
    description: 'Es un vino con mucha acidez, corto y algo maduro en su expresión frutal. Con taninos firmes pero nada agresivos, ' +
    'que le aportan cierto carácter a cada trago. Por su paso vibrante y entretenido es ideal para acompañar asados, ' +
    'picadas, pizzas y empanadas.',
    brand: 'Bodega Passionate Wine',
    price:1200,
    year:2020,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632248131/via-revolucionaria-bonarda.jpg'
  },{
    name: 'Santa Julia Reserva Malbec',
    description: 'Aromas de fruta madura típicos de Malbec y notas ahumadas que denotan su paso por barricas. Color violeta oscuro, ' +
                 'con reflejos azulados. Nariz con aromas típicos del Malbec, con un perfil frutado y fresco que recuerdan a frutos ' +
                 'rojos y negros como cerezas, ciruelas y moras. De cuerpo medio, con taninos amables y acidez equilibrada. Final ' +
                 'frutado y especiado.',
    brand:'Bodega Santa julia',
    price:700,
    year:2019,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632244232/santa-julia-reserva-malbec.jpg'
  },{
    name: 'Manos Negras Malbec',
    description: 'Intenso en nariz, con aromas a cerezas negras y matices de chocolate y hojas. De cuerpo medio, textura redonda ' +
                 'y sedosa. Tiene un delicioso núcleo de fruta negra y un excelente equilibrio. Suave y divertido. Para beber ahora.',
    brand:'Bodega Manos Negras',
    price:990,
    year:2020,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632241706/manos-negras-malbec.jpg'
  },{
    name: 'Finca Suarez Cabernet Sauvignon',
    description: 'Finca Suarez se desarrolla en las tierras que a principios del siglo pasado eligió el ingeniero Leopoldo Suarez.' +
                 'Son cuatro generaciones produciendo vinos los cuales son reconocidos por los principales criticos internacionales.',
    brand:'Bodega Finca Suarez',
    price:1400,
    year:2019,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632240468/finca-suarez-cabernet-sauvignon.jpg'
  },{
    name: 'La Posta Glorieta Pinot Noir',
    description: 'Fácil de beber, aromas a nuez moscada, especias y notas florales. Rojo intenso. En el paladar cerezas, ' +
                'rematando con un leve toque de roble. De cuerpo medio y delicioso, este es un vino perfecto para disfrutarlo ' +
                'antes y durante la comida. Complementa a la perfección con platos con cordero y salmón asado.',
    brand:'Bodega La Posta By Laura Catena',
    price:1300,
    year:2019,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632241396/la-posta-glorieta-pinot-noir.jpg'
  },{
    name: 'Altaland Torrontés Salta',
    description: 'Delicado, elegante y distinguido con notas florales de rosas combinadas con aromas cítricos y un toque especiado, ' +
                 'lo que lo hace ideal para combinar con la comida étnica, como el mexicano, el peruano y el marisco.',
    brand:'Bodega La Posta By Laura Catena',
    price:1150,
    year:2018,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632234995/altaland-torrontes.jpg'
  },{
    name: 'Aberlour Single Malt 12',
    description: 'Whisky de 12 años en botella de 700cc. Este ejemplar es considerado como un típico whisky de la zona de Speyside, ' +
                 'ya que la doble maduración en distintas barricas le otorgan un balance entre un sabor dulce avainillado con notas ' +
                 'de frutas cítricas y maduras. Para muchos es considera como una excelente opción por su extraordinaria relación ' +
                 'precio-calidad.',
    brand:'Aberlour',
    price:6050,
    year:2004,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632234943/Aberlour_Single_Malt_12.webp'
  },{
    name: 'Espumante Trivento Brut Nature',
    description: 'Color: rosa tenue, buen desprendimiento de burbujas y corona persistente. ' + 
                 'Aroma a duraznos secos, pan tostado y nuez moscada, con toques de fruta roja. ' +
                 'Equilibrado en cuanto a su acidez, de buena persistencia.',
    brand:'Bodega Trivento',
    price:600,
    year:2009,
    rating:0,
    stock:20,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632249594/espumante-trivento-brut-nature.jpg'
  },{
    name: 'Baron B Brute Nature Cuvee',
    description: 'Un largo y sereno reposo en la penumbra de nuestra bodega aporta a Baron B Brut Nature su riqueza y su brillo, ' +
                 'lo que da como resultado un producto de altísima calidad.',
    brand:'Bodega Chandon',
    price:2200,
    year:2014,
    rating:0,
    stock:40,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632249515/espumante-BaronBcuvee.webp'
  },{
    name: 'Luigi Bosca Brut',
    description: '',
    brand:'',
    price:2100,
    year:2019,
    rating:0,
    stock:36,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632249483/espumante%3Dluigi-bosca-brut.webp'
  },{
    name: 'Nicasia malbec',
    description: 'Tiene un aroma intensos y dulces sabores a ciruelas y moras maduras aportados por el Malbec, junto a sutiles ' +
                 'notas especiadas conferidos por el Cabernet Sauvignon y el Petit Verdot. Ideal para Carnes,Asado,Pastas,Guiso.',
    brand:'Bodega Catena Zapata',
    price:880,
    year:2020,
    rating:0,
    stock:40,
    picture:''
  },{
    name: 'Rutini Malbec',
    description: 'Rojo violáceo muy profundo. Los intensos aromas frutados se presentan entremezclados con ' +
                 'otros propios de la crianza en roble nuevo (vainilla, ahumados, tostados). En boca, su ' +
                 'estructura concentrada deja la evocación de sus taninos suaves y sucrosos.',
    brand:'Bodega La Rural',
    price:2180,
    year:2018,
    rating:0,
    stock:40,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632324263/rutini-malbec.webp'
  },{
    name: 'Dv Catena Syrah',
    description: 'es un vino elegante y complejo, de gran concentración, color violeta oscuro con matices negros. ' + 
                 'A la nariz, intenso y complejo, presenta aromas de moras maduras, ciruelas y cuero, con notas ' +
                 'ligeras de vainilla, tabaco y licor.',
    brand:'Bodega Catena Zapata',
    price:1380,
    year:2010,
    rating:0,
    stock:40,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632324768/dvcatena-syrah.webp'
  },{
    name: 'Patagonia Amber Lager',
    description: 'Patagonia Amber Lager es una cerveza con una combinación de lúpulos patagónicos y un blend de ' +
                 'finas maltas que generan su color rojizo, un delicado aroma y un amargor apacible que permite ' +
                 'dar a luz a un tostado delicioso. Ideal para acompañar carnes asadas y pastas con salsas especiadas.',
    brand:'Patagonia',
    price:270,
    year:2019,
    rating:0,
    stock:40,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632324965/patagonia-amber-lager.webp'
  },{
    name: 'Patagonia Bohemian Pilsener',
    description: 'Patagonia Bohemian Pilsener es una cerveza con un proceso de macerado de sus maltas y lúpulo patagónico ' +
                 'que originan un color dorado brillante, gran cuerpo , amargor equilibrado y aroma con notas Frutales. Es ' +
                 'ideal para acompañar carnes blancas',
    brand:'Patagonia',
    price:270,
    year:2019,
    rating:0,
    stock:40,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632325792/patagonia-bohemian-pilsener.webp'
  },{
    name: 'Quilmes Stout',
    description: 'Se destaca por el dulzor, característica que la distingue de las otras cervezas negras del mercado. ' +
                 'Las Stout poseen un sabor inconfundible a caramelo de fácil percepción, tienen un aroma a malta tostada, ' + 
                 'donde se destaca la esencia de la levadura que remite a café y su color es negro intenso.',
    brand:'Quilmes',
    price:160,
    year:2019,
    rating:0,
    stock:40,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632326102/quilmes-stout.webp'
  },{
    name: 'Stella Artois Noire',
    description: 'cerveza negra premium, de espuma cremosa y color negro intenso. Esta cerveza presenta el característico ' +
                 'aroma a lúpulo de una Stella Artois con el agregado de sus notas caramelo. Equilibrada, de cuerpo justo y ' +
                 'amargor balanceado.',
    brand:'Stella Artois',
    price:200,
    year:2020,
    rating:0,
    stock:40,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632326287/stella-artois-noire.webp'
  },{
    name: 'Heineken',
    description: 'Heineken es una cerveza premium de gran tradición y calidad. Cebada malteada, agua, lúpulo y la ' +
                 'exclusiva levadura A-Yeast® son los ingredientes 100% naturales que le entregan su distintivo sabor ' +
                 'y su inigualable calidad.',
    brand:'Heineken',
    price:230,
    year:2021,
    rating:0,
    stock:40,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632326460/heineken-tradicional.webp'
  },{
    name: 'Stella Artois',
    description: 'Es la cerveza belga más conocida y vendida del mundo. Esta lager inspirada en el estilo Pilsner cuenta ' +
                'con una rica herencia que se remonta nada menos que al año 1366 ',
    brand:'Stella Artois',
    price:220,
    year:2020,
    rating:0,
    stock:40,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632326571/stella-artois-tradicional.webp'
  },{
    name: 'Beagle Red Ale',
    description: 'Red Ale es una cerveza de color rojizo profundo, cristalina y con cuerpo intenso. Presenta aromas a' +
                 ' caramelo tostado y frutas secas. Su sabor a malta caramelo es intenso, y su amargor, medio y equilibrado.',
    brand:'Beagle',
    price:350,
    year:2019,
    rating:0,
    stock:40,
    picture:'https://res.cloudinary.com/wineec/image/upload/v1632326814/beagle-red-ale.webp'
  }]

  try {
    const newProducts = products.map(async(p) => {
      return await Product.create({
        name: p.name,
        description: p.description,
        brand:p.brand,
        price: p.price,
        year: p.year,
        rating: p.rating,
        stock:p.stock,
        picture: p.picture
      })
    })
  
   return Promise.all(newProducts)
  } catch (error) {
    return console.log(error)
  }
}


module.exports = preloadProducts;