const compressor = require('node-minify');

const promise = compressor.minify({
  compressor: 'uglify-es',
  input: './js/advocacy.js',
  output: './js/dist/advocacy.min.js'
});

promise
  .catch(error => {
    console.error(error)
  })
  .then(message => {
  });
