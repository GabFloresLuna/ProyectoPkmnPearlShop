// Karma + Jasmine para probar los componentes React (karma-esbuild compila el JSX).
module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],
    plugins: ['karma-jasmine', 'karma-chrome-launcher', 'karma-esbuild'],
    files: ['test/setup.js', { pattern: 'src/**/*.spec.{js,jsx}', watched: false }],
    preprocessors: { 'src/**/*.spec.{js,jsx}': ['esbuild'] },
    esbuild: {
      jsx: 'automatic',
      target: 'es2020',
      define: { 'process.env.NODE_ENV': '"test"' },
      loader: { '.css': 'empty' },
    },
    browsers: ['ChromeHeadlessNoSandbox'],
    customLaunchers: { ChromeHeadlessNoSandbox: { base: 'ChromeHeadless', flags: ['--no-sandbox'] } },
    reporters: ['progress'],
    singleRun: true,
  });
};
