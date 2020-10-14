const compressor = require('node-minify');

const promise = compressor.minify({
  compressor: 'uglify-es',
  input: './source/advocacy.js',
  output: './base/js/advocacy.js',
  options: {
    warnings: true,
    mangle: true,
    compress: true
  }
});

promise
  .catch(error => {
    console.error(error)
  })
  .then(message => {
  });
