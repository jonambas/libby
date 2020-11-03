import React from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import css from '@styled-system/css';
import Box from '@sweatpants/box';
import SearchContext from '../context/SearchContext';
import Button from './Button';
import Chevron from './Chevron';

function getSearchableString(str) {
  return str.replace('-', ' ').replace('__', ' ').toLowerCase();
}

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
    outline: none;

    ${css({
      px: 200,
      py: 100,
      my: 100,
      fontSize: 100
    })}
    ${({ selected }) => (selected ? css({ color: 'blue', transform: 'translateX(3px)' }) : null)}
  }

  a:hover {
    ${css({ bg: 'gray.200' })}
  }

  a:focus-visible {
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.blue};
  }
`;

function NavEntry(props) {
  const { entry } = props;
  const inputSearchValue = React.useContext(SearchContext);

  const search = window.location.search;
  const selectedKey = search.replace('?path=', '');
  const stringToSearch = getSearchableString(entry.key);

  if (inputSearchValue.length && !stringToSearch.includes(inputSearchValue)) {
    return null;
  }

  return (
    <NavLi selected={selectedKey === entry.key}>
      <Link to={`?path=${entry.key}`}>{entry.name}</Link>
    </NavLi>
  );
}

function NavFolder(props) {
  const { kind, item, pl } = props;
  const [show, setShow] = React.useState(false);
  const inputSearchValue = React.useContext(SearchContext);

  const containsSearchItem = React.useMemo(() => {
    let contains = false;

    // Checks if anything is being searched
    if (!inputSearchValue.length) {
      return false;
    }

    // Checks if this folder itself matches input search
    const rootKind = getSearchableString(kind);
    if (rootKind.includes(inputSearchValue)) {
      return true;
    }

    function searchEntries(entries) {
      return entries.reduce((acc, entry) => {
        const stringToSearch = getSearchableString(entry.key);
        return acc || stringToSearch.includes(inputSearchValue);
      }, false);
    }

    function searchKinds(kinds) {
      return Object.keys(kinds).reduce((acc, folderKind) => {
        const hasKinds = kinds[folderKind].kinds;
        const hasEntries = kinds[folderKind].entries && kinds[folderKind].entries.length;

        if (acc) {
          return true;
        }

        if (getSearchableString(folderKind).includes(inputSearchValue)) {
          return true;
        }

        if (hasEntries) {
          acc = searchEntries(kinds[folderKind].entries);
        }

        if (hasKinds && !acc) {
          acc = searchKinds(kinds[folderKind].kinds);
        }

        return acc;
      }, false);
    }

    // Checks child entries of this folder
    if (item.entries) {
      contains = searchEntries(item.entries);
    }

    // Recursively checks kinds of this folder, and all kinds/entries underneath
    if (item.kinds && contains === false) {
      contains = searchKinds(item.kinds);
    }

    return contains;
  }, [item, inputSearchValue]);

  if (inputSearchValue.length && !containsSearchItem) {
    return null;
  }

  return (
    <Box pl={pl || '400'}>
      <Button onClick={() => setShow(!show)}>
        <Chevron open={show || containsSearchItem} /> {kind}
      </Button>
      {show || containsSearchItem ? <NavKind item={item} /> : null}
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
      {Object.keys(kinds).map((kind) => {
        return <NavFolder kind={kind} item={kinds[kind]} key={kind} pl="0" />;
      })}
      {rootEntries.map((entry) => (
        <NavEntry entry={entry} key={entry.key} />
      ))}
    </div>
  );
}

export default NavRoot;
