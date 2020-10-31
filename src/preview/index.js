import React from 'react';
import ReactDOM from 'react-dom';
import { api } from '../api';

const out = document.createElement('div');
document.body.append(out);

function Preview() {
  const entry = api.getEntry();
  console.log(entry);
  if (!entry) {
    return null;
  }
  return <div data-id="libra-preview">{entry.render()}</div>;
}

function renderPreview() {
  ReactDOM.render(<Preview />, out);
}

renderPreview();
