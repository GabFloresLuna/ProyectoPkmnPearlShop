const BENEFICIOS = [
  { titulo: 'Productos originales', texto: 'Cada artículo es verificado antes de salir de bodega.' },
  { titulo: 'Despacho a todo Chile', texto: 'Envíos en 48 horas hábiles a regiones y RM.' },
  { titulo: 'Pago seguro', texto: 'Compra protegida y seguimiento de tu pedido.' },
];

/** Franja de ventajas de comprar en la tienda (Home, Productos, Carrito). */
function Beneficios() {
  return (
    <section className="beneficios" aria-labelledby="beneficios-titulo">
      <div className="contenedor">
        <h2 className="visually-hidden" id="beneficios-titulo">Beneficios de comprar en PokéTienda Pearl</h2>
        <ul className="beneficios__lista">
          {BENEFICIOS.map((b) => (
            <li className="beneficio" key={b.titulo}>
              <span className="beneficio__icono" aria-hidden="true">✦</span>
              <h3 className="beneficio__titulo">{b.titulo}</h3>
              <p className="beneficio__texto">{b.texto}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Beneficios;
