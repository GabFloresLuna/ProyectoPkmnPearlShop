/** Mensaje de resultado de un formulario. Solo se renderiza cuando hay mensaje. */
function Feedback({ feedback }) {
  if (!feedback) return null;
  return (
    <p className={`formulario__feedback formulario__feedback--${feedback.tipo}`} role="status" aria-live="polite"
       style={{ display: 'block' }}>
      {feedback.texto}
    </p>
  );
}

export default Feedback;
