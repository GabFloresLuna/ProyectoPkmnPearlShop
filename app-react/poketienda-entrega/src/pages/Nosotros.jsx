const EQUIPO = [
  { nombre: 'Gabriel Flores', rol: 'Desarrollador Fullstack', img: '/images/gabrielFlores.png', texto: 'Encargado de la arquitectura HTML semántica y la lógica de negocio en JavaScript. Apasionado por la accesibilidad y las buenas prácticas web.' },
  { nombre: 'Daniel Rangel', rol: 'Diseñador UI / Frontend', img: '/images/danielRangel.jpg', texto: 'Encargado de las validaciones de formularios, la gestión del repositorio remoto y las pruebas funcionales de cada vista del sitio.' },
  { nombre: 'Hernaldo Silva', rol: 'Desarrollador Frontend / QA', img: '/images/hernaldoSilva.png', texto: 'Responsable de la identidad visual, la paleta inspirada en Palkia y la implementación de las hojas de estilo del proyecto.' },
];

export default function Nosotros() {
  return (
    <>
      <p className="text-uppercase text-warning mb-1">Quiénes somos</p>
      <h1 className="display-6">Sobre PokéTienda Pearl</h1>
      <p className="lead">Nacimos de la nostalgia por la Generación IV y del cariño por la región de Sinnoh. Somos una tienda online creada por coleccionistas, para coleccionistas.</p>

      <div className="row g-4 my-3">
        <div className="col-md-6">
          <h2 className="h4">Misión</h2>
          <p>Acercar a los fans de Pokémon de la era DS productos originales y de calidad, con una experiencia de compra premium, rápida y confiable.</p>
        </div>
        <div className="col-md-6">
          <h2 className="h4">Visión</h2>
          <p>Convertirnos en la tienda de referencia en Chile para coleccionistas de Pokémon, reconocida por su curaduría y por su identidad visual única.</p>
        </div>
      </div>

      <h2 className="h3 mt-4">Equipo desarrollador</h2>
      <p className="text-secondary">Tres estudiantes, una misma pasión: construir una experiencia web que haga justicia a la Generación IV.</p>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {EQUIPO.map((m) => (
          <div className="col" key={m.nombre}>
            <div className="card h-100 text-center p-3">
              <img src={m.img} alt={`Foto de ${m.nombre}`} className="rounded-circle mx-auto mb-3" width="120" height="120" style={{ objectFit: 'cover' }} />
              <h3 className="h5">{m.nombre}</h3>
              <p className="text-warning small">{m.rol}</p>
              <p className="small mb-0">{m.texto}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
