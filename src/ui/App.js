import React from 'react';
import { Router, Link } from '@reach/router';
import Theme from '@sweatpants/theme';
import Box from '@sweatpants/box';
import { theme } from './theme';
import styled from 'styled-components';
import css from '@styled-system/css';
import { bus } from '../api';
import { buttonReset } from './styles/buttonReset';

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
    color: #000000;
    text-decoration: none;
    border-radius: 4px;
    ${css({
      px: 200,
      py: 100,
      my: 100
    })}
    ${({ selected }) => (selected ? css({ color: 'blue', fontWeight: '500' }) : null)}
  }

  a:hover {
    ${css({ bg: 'gray.200' })}
  }
`;

const StyledButton = styled.button`
  ${buttonReset}
  cursor: pointer;
  outline: none;
  border-radius: 4px;
  ${css({
    px: 0,
    pr: 200,
    py: 100,
    my: 100
  })}

  &:hover {
    ${css({ bg: 'gray.200' })}
  }
`;

function Button(props) {
  return <StyledButton {...props} />;
}

const StyledChevron = styled.span`
  display: inline-block;
  transform: rotate(${(props) => (props.open ? '90deg' : '0deg')});
  transition: transform 0.1s;
`;

function Chevron({ open }) {
  return (
    <Box as={StyledChevron} open={open} color="gray.600">
      <svg
        fill="currentColor"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 24 24"
        width="14px"
        height="14px"
      >
        <g>
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
        </g>
      </svg>
    </Box>
  );
}

function NavEntry(props) {
  const { entry } = props;
  const search = window.location.search;
  const selectedKey = search.replace('?path=', '');

  return (
    <NavLi selected={selectedKey === entry.key}>
      <Link to={`?path=${entry.key}`}>{entry.name}</Link>
    </NavLi>
  );
}

function NavFolder(props) {
  const { kind, item, pl } = props;
  const [show, setShow] = React.useState(false);

  return (
    <Box pl={pl || '400'}>
      <Button onClick={() => setShow(!show)}>
        <Chevron open={show} /> {kind}
      </Button>
      {show && <NavKind item={item} />}
    </Box>
  );
}

const StyledFolderBorder = styled.div`
  position: absolute;
  left: 7px;
  top: 0;
  bottom: 0;
  width: 1px;

  ${css({
    bg: 'gray.300'
  })}
`;

function NavKind(props) {
  const { item = {} } = props;
  return (
    <Box position="relative">
      <StyledFolderBorder />
      {item.kinds
        ? Object.keys(item.kinds).map((kind) => {
            return <NavFolder kind={kind} item={item.kinds[kind]} key={kind} />;
          })
        : null}
      {item.entries
        ? item.entries.map((entry) => {
            return (
              <Box key={entry.key} pl="400">
                <NavEntry entry={entry} />
              </Box>
            );
          })
        : null}
    </Box>
  );
}

function NavRoot(props) {
  const { items = {} } = props;
  const { root, ...kinds } = items;
  const rootEntries = items.root ? items.root.entries : [];

  return (
    <div>
      {rootEntries.map((entry) => (
        <NavEntry entry={entry} key={entry.key} />
      ))}
      {Object.keys(kinds).map((kind, i) => {
        return <NavFolder kind={kind} item={kinds[kind]} key={kind} pl="0" />;
      })}
    </div>
  );
}

function App() {
  const [navItems, setNavItems] = React.useState();
  const search = window.location.search;

  bus.on('set_entries', setNavItems);

  React.useEffect(() => {
    bus.emit('load_entry', search);
  }, [search]);

  return (
    <Box display="grid" gridTemplateColumns="minmax(180px, 15%) 1fr">
      <Box p="400">
        <Box as="h1" fontSize="200">
          Libra
        </Box>
        <Box as="nav" pt="400">
          <NavRoot items={navItems} />
        </Box>
      </Box>
      <Box height="100vh" p="400">
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
