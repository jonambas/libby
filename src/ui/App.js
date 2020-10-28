import React from 'react';
import { Router, Link } from '@reach/router';
import { bus } from '../api';
import Theme from '@sweatpants/theme';
import Box from '@sweatpants/box';
import { theme } from './theme';
import styled from 'styled-components';

const NavUl = styled(Box)`
  list-style-type: none;
`;

const NavLi = styled.li`
  list-style-type: none;
  padding: 0rem;
  margin: 0;

  a,
  a:visited {
    display: inline-block;
    padding: 2px 0;
    color: #0000ff;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

function App() {
  const [data, setData] = React.useState();
  const search = window.location.search;

  bus.on('set_entries', setData);

  React.useEffect(() => {
    bus.emit('load_entry', search);
  }, [search]);

  const navItems = React.useMemo(() => {
    if (data) {
      return data.reduce((acc, kindArray) => {
        const kind = kindArray[0].kind;
        if (acc[kind]) {
          return acc;
        }
        acc[kind] = kindArray;
        return acc;
      }, []);
    }
    return [];
  }, [data]);

  return (
    <Box display="grid" gridTemplateColumns="minmax(180px, 15%) 1fr">
      <Box p="400">
        <Box as="h1" fontSize="300">
          Libra
        </Box>
        <Box as="nav" pt="500">
          {Object.keys(navItems).map((kind) => {
            return (
              <div key={kind}>
                <Box mb="200" fontSize="100" fontWeight="500">
                  {kind}
                </Box>
                <NavUl as="ul" m="0" p="0" mb="500">
                  {navItems[kind].map((entry) => {
                    return (
                      <NavLi key={entry.key}>
                        <Link to={`?path=${entry.key}`}>{entry.name}</Link>
                        {}
                      </NavLi>
                    );
                  })}
                </NavUl>
              </div>
            );
          })}
        </Box>
      </Box>
      <Box height="100vh" p="500">
        <Box
          as="iframe"
          src={`${window.location.origin}/iframe.html`}
          width="100%"
          height="100%"
          border="none"
        ></Box>
      </Box>
    </Box>
  );
}

function Wrapper() {
  return (
    <Theme theme={theme}>
      <Router>
        <App path="/" />
      </Router>
    </Theme>
  );
}
export default Wrapper;
