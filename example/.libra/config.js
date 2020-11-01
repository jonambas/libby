export default {
  port: 9000,
  entries: require.context('../src', true, /\.libra\.js$/),
  title: 'Libra Example'
};
