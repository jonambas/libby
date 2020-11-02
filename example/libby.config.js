module.exports = {
  entries: () => require.context('./src', true, /\.libby\.js$/),
  title: 'Libby Example',
  webpackConfig: () => ({}),
  layout: './.libby/layout.js',
  port: 9003,
  outputPath: 'libby-example'
};
