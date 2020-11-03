import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'query-string';
import { api } from '../api';

const out = document.createElement('div');
document.body.append(out);

function renderPreview(props = {}) {
  const { layout = require('__LIBBY_LAYOUT__') } = props;
  const { path } = qs.parse(window.location.search);

  const entry = api.getEntry(path);
  const Wrapper = layout?.default || layout;

  if (!entry) {
    return null;
  }

  ReactDOM.render(<Wrapper>{entry.render()}</Wrapper>, out);
}

renderPreview();

if (module.hot) {
  module.hot.accept('__LIBBY_LAYOUT__', () => {
    renderPreview({ layout: require('__LIBBY_LAYOUT__') });
  });
}
