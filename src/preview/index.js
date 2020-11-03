import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'query-string';
import { api } from '../api';

const out = document.createElement('div');
document.body.append(out);

function Preview() {
  const { path } = qs.parse(window.location.search);
  const entry = api.getEntry(path);

  if (!entry) {
    return null;
  }

  const layout = require('__LIBBY_LAYOUT__');
  const Wrapper = layout.default || layout;

  return (
    <div data-id="libby-preview">
      <Wrapper>{entry.render()}</Wrapper>
    </div>
  );
}

function renderPreview() {
  ReactDOM.render(<Preview />, out);
}

renderPreview();
