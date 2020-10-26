module.exports = {
  port: 9000,
  stories: require.context('./src', true, /\.libra\.js$/)
};
