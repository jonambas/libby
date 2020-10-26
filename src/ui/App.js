import React from 'react';
// import { STORE } from '../api/context';
import config from '__LIBRA_CONFIG__';

function App() {
  return (
    <>
      <h1>Libra</h1>
      <iframe src={`${window.location}iframe.html`} width="100%" height="600px"></iframe>
    </>
  );
}

export default App;
