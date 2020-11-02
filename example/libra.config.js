module.exports = {
  entries: require.context('./src', true, /\.libra\.js$/),
  title: 'Libra Example',
  webpackConfig: () => ({}),
  layout: './.libra/layout.js',
  port: 9003,
  outputPath: 'libra-example'
};
