/** Encabezado de página (eyebrow + título + descripción). */
function PageHero({ id, eyebrow, titulo, descripcion }) {
  return (
    <section className="page-hero" aria-labelledby={id}>
      <div className="contenedor">
        {eyebrow && <p className="page-hero__eyebrow">{eyebrow}</p>}
        <h1 className="page-hero__titulo" id={id}>{titulo}</h1>
        {descripcion && <p className="page-hero__descripcion">{descripcion}</p>}
      </div>
    </section>
  );
}

export default PageHero;
