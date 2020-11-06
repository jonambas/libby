import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'query-string';
import { api } from '../api';
import Source from './source';

const out = document.createElement('div');
document.body.append(out);

const style = document.createElement('style');
style.innerHTML = `
  body { font-size: 16px; margin: 0; }
  * { box-sizing: border-box; }
`;
document.head.appendChild(style);

function Preview({ layout: Layout = require('./layout') } = {}) {
  const { path, source } = qs.parse(window.location.search);
  const entry = api.getEntry(path);

  if (!entry) {
    return null;
  }

  if (source === 'true') {
    return <Source entry={entry} />;
  }

  return <Layout>{entry.render()}</Layout>;
}

function renderPreview() {
  ReactDOM.render(<Preview />, out);
}

renderPreview();
