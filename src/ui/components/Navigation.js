import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import css from '@styled-system/css';
import Box from '@sweatpants/box';
import Button from './Button';
import Chevron from './Chevron';

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
    transition: 0.2s;
    ${css({
      px: 200,
      py: 100,
      my: 100
    })}
    ${({ selected }) => (selected ? css({ color: 'blue', transform: 'translateX(3px)' }) : null)}
  }

  a:hover {
    ${css({ bg: 'gray.200' })}
  }
`;

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
      {Object.keys(kinds).map((kind, i) => {
        return <NavFolder kind={kind} item={kinds[kind]} key={kind} pl="0" />;
      })}
      {rootEntries.map((entry) => (
        <NavEntry entry={entry} key={entry.key} />
      ))}
    </div>
  );
}

export default NavRoot;
