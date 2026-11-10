const path = require('path');
const esbuild = require('esbuild');

module.exports = function (config) {
  // Preprocesador propio: bundlea cada spec EN MEMORIA con esbuild.
  // Usamos stdin + resolveDir para que esbuild resuelva los imports
  // desde la ruta REAL del spec, no desde un directorio temporal.
  const esbuildInlinePlugin = {
    'preprocessor:esbuild-inline': ['factory', function () {
      return function (content, file, done) {
        const source = Buffer.isBuffer(content) ? content.toString('utf8') : content;
        esbuild.build({
          stdin: {
            contents: source,
            sourcefile: file.path,
            resolveDir: path.dirname(file.path),
            loader: file.path.endsWith('.jsx') ? 'jsx' : 'js',
          },
          bundle: true,
          write: false,          // <-- en memoria, sin archivos temporales
          format: 'iife',
          jsx: 'automatic',
          target: 'es2020',
          define: { 'process.env.NODE_ENV': '"test"' },
          loader: {
            '.css': 'empty',
            '.svg': 'dataurl',
            '.png': 'dataurl',
            '.jpg': 'dataurl',
            '.webp': 'dataurl',
          },
        })
          .then((result) => done(null, result.outputFiles[0].text))
          .catch((err) => done(err));
      };
    }],
  };

  config.set({
    basePath: __dirname,
    frameworks: ['jasmine'],
    plugins: ['karma-jasmine', 'karma-chrome-launcher', esbuildInlinePlugin],
    files: [
      'test/setup.js',
      { pattern: 'src/**/*.spec.+(js|jsx)', watched: false },
    ],
    preprocessors: {
      'src/**/*.spec.+(js|jsx)': ['esbuild-inline'],
    },
    client: { jasmine: { random: true } },
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox', '--disable-gpu'],
      },
    },
    reporters: ['progress'],
    singleRun: true,
  });
};