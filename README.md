## Libby

Libby is a focused, no-frills React component development tool, similar to Storybook but without the plugins or addons. Libby provides a standalone environment that can be used or deployed with your component or design system documentation.

##### Demos
- [libby.vercel.app](https://libby.vercel.app/)

---

### Getting Started

Install `libby` in your app:

```bash
npm i proply-react
```

Create a `libby.config.js` file to the root directory of your project:

```js
// libby.config.js
module.exports = {
  // Required
  entries: () => require.context('./src', true, /\.libby\.js$/),
  outputPath: 'dist',

  // Optional
  layout: 'src/components/layout.js',
  openBrowser: true,
  port: 9000,
  title: 'Page Title',
  webpackConfig: () => ({
    // Custom Webpack config goes here
  })
};
```

Add the following scripts to your `package.json` file:

```js
// package.json
"scripts": {
  "libby:start": "libby start",
  "libby:build": "libby build"
}
```

And finally, run libby:

```bash
npm run libby:start
# That's it!
```

---

### License

MIT
