import React from 'react';
import { describe, add } from '@libra/react';

describe('Category1', () => {
  add('story title1', () => <div>This is a React component</div>);
  add('story title2', () => <div>This is another React component</div>);
});

describe('Category2', () => {
  add('story title3', () => <div>This is a another another React component</div>);
  add('story title4', () => <div>This is another another another React component</div>);
});

describe('Category3', () => {
  add('story title5', () => {
    const [toggle, setToggle] = React.useState(true);

    return (
      <div>
        <button onClick={() => setToggle(!toggle)}>toggle</button>
        {toggle ? 'am i working?' : 'yes'}
      </div>
    );
  });
});
