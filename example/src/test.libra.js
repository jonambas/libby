import React from 'react';
import { add } from '@libra/react';

add('first story title', () => <div>This is a React component</div>);

add('second story title', () => <div>This is another React component</div>);

add('third story title', () => {
  const [toggle, setToggle] = React.useState(true);
  return (
    <div>
      <button onClick={() => setToggle(!toggle)}>toggle</button>
      {toggle ? 'am i working?' : 'yes'}
    </div>
  );
});
