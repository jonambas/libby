import React from 'react';
import ReactDOM from 'react-dom';
import { api } from '../api';

const out = document.createElement('div');
document.body.append(out);

function Preview() {
  const entry = api.getEntry();

  if (!entry) {
    return null;
  }

  const Wrapper = React.useMemo(() => {
    let Layout;

    try {
      Layout = require('__LIBRA_LAYOUT__');
    } catch (e) {}

    return Layout.default ? Layout.default : 'div';
  }, []);

  return (
    <div data-id="libra-preview">
      <Wrapper>{entry.render()}</Wrapper>
    </div>
  );
}

function renderPreview() {
  ReactDOM.render(<Preview />, out);
}

renderPreview();
