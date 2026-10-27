import { Link, useParams } from 'react-router-dom';

// Los artículos son datos: un solo componente sirve para el listado y para el detalle.
const ARTICULOS = [
  {
    "id": "1",
    "categoria": "Caso curioso",
    "titulo": "El misterio de las perlas en la mitología de Sinnoh",
    "fecha": "12 de marzo, 2025",
    "lectura": "5 min de lectura",
    "autor": "Por Daniel Rangel",
    "img": "/images/blog-perla-mitologia.jpg",
    "intro": [
      "Palkia, el Pokémon legendario que controla el espacio, aparece en la carátula de Pokémon Pearl Version flanqueado por una perla. Pero ¿por qué una perla? Y más importante aún: ¿qué nos dice esa elección sobre la cosmología de la región de Sinnoh?"
    ],
    "secciones": [
      {
        "titulo": "El espacio y la materia",
        "parrafos": [
          "En la mitología de Sinnoh, el universo fue creado por Arceus, quien delegó el control del tiempo a Dialga y del espacio a Palkia. Mientras Dialga representa el devenir y la estructura temporal, Palkia encarna la expansión, la materia y la forma.",
          "La perla, con su superficie nacarada y su origen en el interior de las conchas, ha sido durante siglos un símbolo de perfección formada lentamente. En muchas culturas orientales se la asocia al orden dentro del caos, precisamente la función que Palkia cumple en el universo Pokémon."
        ]
      },
      {
        "titulo": "La perla como símbolo generacional",
        "parrafos": [
          "Cuando Game Freak eligió nombrar la versión de Nintendo DS como Pearl, no fue solo por el brillo de la carátula. La perla se convirtió en el emblema de toda una generación que descubrió Pokémon en pantallas táctiles, con conexión Wi-Fi y una región completamente nueva.",
          "Para muchos coleccionistas, sostener una perla decorativa es sostener un pedazo de infancia. Por eso en PokéTienda Pearl la perla no es un adorno: es el corazón de nuestra identidad visual."
        ]
      },
      {
        "titulo": "Conclusión",
        "parrafos": [
          "La perla de Pearl no es un detalle estético: es un símbolo cargado de significado. Representa el orden, la forma y esa nostalgia generacional que seguimos celebrando cada vez que abrimos una caja de colección."
        ]
      }
    ],
    "resumen": "Palkia, el legendario que controla el espacio, está asociado a las perlas en la cosmología de Sinnoh. Repasamos el origen mitológico de esta asociación y por qué una perla se volvió el símbolo de toda una generación."
  },
  {
    "id": "2",
    "categoria": "Historia",
    "titulo": "Cómo la Generación IV marcó un antes y un después en Pokémon",
    "fecha": "28 de febrero, 2025",
    "lectura": "7 min de lectura",
    "autor": "Por Gabriel Flores",
    "img": "/images/blog-gen4.jpeg",
    "intro": [
      "2006 fue un año bisagra para la saga. Con la llegada de Pokémon Diamond y Pokémon Pearl a Nintendo DS, la franquicia no solo cambió de consola: cambió su forma de entender la conexión entre jugadores."
    ],
    "secciones": [
      {
        "titulo": "Una nueva región: Sinnoh",
        "parrafos": [
          "Sinnoh se inspiró en la isla japonesa de Hokkaido, y fue la primera región en incorporar un Monte Coronet como eje geográfico central. Su diseño introdujo una estructura vertical inédita: los jugadores tenían que atravesar la región de norte a sur, atravesando nieve, cuevas y lagos legendarios."
        ]
      },
      {
        "titulo": "La conexión online cambió todo",
        "parrafos": [
          "La característica estrella de la Generación IV fue la Nintendo Wi-Fi Connection. Por primera vez en la saga principal, era posible intercambiar Pokémon y combatir con jugadores de todo el mundo sin cables ni adaptadores.",
          "Esto no solo transformó la experiencia de juego: sentó las bases de lo que hoy conocemos como la escena competitiva moderna de Pokémon."
        ]
      },
      {
        "titulo": "Pantalla táctil y reloj Pokétch",
        "parrafos": [
          "La doble pantalla de la DS permitió introducir el Pokétch, un reloj multifunción que ofrecía mapas, contador de pasos, calculadora y hasta un medidor de felicidad para los Pokémon del equipo.",
          "Fue una de las primeras veces que la saga integró verdaderamente las capacidades del hardware en la jugabilidad cotidiana, en lugar de solo utilizarlas como un extra."
        ]
      },
      {
        "titulo": "El legado",
        "parrafos": [
          "Muchos consideran a Diamond y Pearl el punto más alto de la saga principal. Introdujeron 107 nuevos Pokémon, la separación física/especial de movimientos y el sistema de combates que hoy seguimos usando.",
          "En PokéTienda Pearl celebramos esa generación no solo vendiendo productos: manteniendo viva la memoria de quienes crecimos persiguiendo a Palkia y Dialga."
        ]
      }
    ],
    "resumen": "La llegada de Nintendo DS trajo consigo conexión online, pantalla táctil y una región completamente nueva: Sinnoh. Analizamos por qué Pearl y Diamond son considerados por muchos el punto más alto de la saga."
  }
];

export default function Blogs() {
  const { id } = useParams();

  if (id) {
    const a = ARTICULOS.find((x) => x.id === id);
    if (!a) {
      return (
        <div className="text-center py-5">
          <h1>Artículo no encontrado</h1>
          <Link className="btn btn-pearl" to="/blogs">Volver al listado</Link>
        </div>
      );
    }
    return (
      <article className="mx-auto" style={{ maxWidth: 760 }}>
        <p className="text-uppercase text-warning mb-1">{a.categoria}</p>
        <h1 className="h2">{a.titulo}</h1>
        <p className="text-secondary">{a.fecha} · {a.lectura} · {a.autor}</p>
        <img src={a.img} alt={a.titulo} className="img-fluid rounded-4 mb-3" />
        {a.intro.map((t) => <p key={t}>{t}</p>)}
        {a.secciones.map((s) => (
          <section key={s.titulo}>
            <h2 className="h4 mt-4">{s.titulo}</h2>
            {s.parrafos.map((t) => <p key={t}>{t}</p>)}
          </section>
        ))}
        <Link className="btn btn-outline-light mt-3" to="/blogs">← Volver al listado</Link>
      </article>
    );
  }

  return (
    <>
      <p className="text-uppercase text-warning mb-1">Bitácora de Sinnoh</p>
      <h1 className="h2">Noticias importantes</h1>
      <p className="text-secondary">Datos curiosos, historia de la Generación IV y todo lo que un coleccionista de la era DS debería saber.</p>
      <div className="row g-4">
        {ARTICULOS.map((a) => (
          <div className="col-md-6" key={a.id}>
            <div className="card h-100">
              <img src={a.img} alt={a.titulo} className="card-img-top" />
              <div className="card-body">
                <small className="text-warning">{a.categoria}</small>
                <h2 className="h5">{a.titulo}</h2>
                <p className="small text-secondary">{a.fecha} · {a.lectura}</p>
                <p>{a.resumen}</p>
                <Link className="btn btn-pearl" to={`/blogs/${a.id}`}>Ver artículo</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
