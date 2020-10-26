import React from 'react';
import ReactDOM from 'react-dom';
import config from '__LIBRA_CONFIG__';
import { Libra } from '../api';
import { STORE, StoreProvider } from '../api/context';

const out = document.createElement('div');
document.body.append(out);

const style = document.createElement('style');
style.innerHTML = `
  body { font-size: 16px; }
  * { box-sizing: border-box; }
`;
document.head.appendChild(style);

//

const api = new Libra();
export const add = api.add.bind(api);

//

function Preview() {
  const { entries = [] } = React.useContext(STORE);
  console.log(entries);
  return (
    <div>
      {entries.length &&
        entries.map((entry) => {
          return (
            <div key={entry.key}>
              <h3>{entry.title}</h3>
              <p>{entry.render()}</p>
            </div>
          );
        })}
    </div>
  );
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
