import React from 'react';
import ReactDOM from 'react-dom';
import config from '__LIBRA_CONFIG__';
import { Libra } from '../api';
import { STORE, StoreProvider } from './context';

const out = document.createElement('div');
document.body.append(out);

const style = document.createElement('style');
style.innerHTML = `
  body { font-size: 16px; }
  * { box-sizing: border-box; }
`;
document.head.appendChild(style);

// Api
export const api = new Libra();
export const add = api.add.bind(api);
export const describe = api.describe.bind(api);

// Preview / iframe rendering
function Preview() {
  const { activeEntry = {} } = React.useContext(STORE);
  return <div data-id="libra-frame">{activeEntry.render && activeEntry.render()}</div>;
}

function renderPreview() {
  api.start(config);
  ReactDOM.render(
    <StoreProvider api={api}>
      <Preview />
    </StoreProvider>,
    out
  );
}

renderPreview();
