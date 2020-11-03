module.exports = {
  entries: () => require.context('./src', true, /\.libby\.js$/),
  title: 'Libby Example',
  layout: '.libby/layout.js',
  port: 9003,
  outputPath: 'dist/libby-example'
};
