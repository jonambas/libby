import React from 'react';
import ReactDOM from 'react-dom';
import qs from 'query-string';
import { api } from '../api';

const out = document.createElement('div');
document.body.append(out);

function Preview() {
  const { path } = qs.parse(window.location.search);
  const entry = api.getEntry(path);

  // Gets user-provided layout wrapper
  const Wrapper = React.useMemo(() => {
    let Layout;

    try {
      Layout = require('__LIBBY_LAYOUT__');
    } catch (e) {}

    return Layout.default || 'div';
  }, []);

  if (!entry) {
    return null;
  }

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
