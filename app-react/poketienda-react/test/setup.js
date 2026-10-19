// Se carga antes de las pruebas: algunas librerías consultan process.env aunque corran en el navegador.
window.process = window.process || { env: { NODE_ENV: 'test' } };
window.scrollTo = window.scrollTo || (() => {});
