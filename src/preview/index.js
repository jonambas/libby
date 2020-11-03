import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'query-string';
import { api } from '../api';

const out = document.createElement('div');
document.body.append(out);

function Preview({ layout: Layout = require('./layout') } = {}) {
  const { path } = qs.parse(window.location.search);
  const entry = api.getEntry(path);

  if (!entry) {
    return null;
  }

  return <Layout>{entry.render()}</Layout>;
}

function renderPreview() {
  ReactDOM.render(<Preview />, out);
}

renderPreview();
