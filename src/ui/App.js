import config from '__LIBRA_CONFIG__';
import React from 'react';
import { Router } from '@reach/router';
import Theme from '@sweatpants/theme';
import Box from '@sweatpants/box';
import { theme } from './theme';
import { bus } from '../api';
import SearchContext from './context/SearchContext';
import useWindowEvent from './hooks/useWindowEvent';
import useIframeEvent from './hooks/useIframeEvent';
import Navigation from './components/Navigation';

function App() {
  const [navItems, setNavItems] = React.useState({});
  const [showSidebar, setShowSidebar] = React.useState(true);
  const [inputValue, setInputValue] = React.useState('');

  const search = window.location.search;

  React.useEffect(() => {
    bus.on('set_entries', setNavItems);
  }, []);

  React.useEffect(() => {
    bus.emit('load_entry', search);
  }, [search]);

  function toggleSidebar(e) {
    if (e.keyCode === 83) {
      setShowSidebar(!showSidebar);
    }
  }

  useWindowEvent('keydown', toggleSidebar);
  useIframeEvent('libra-iframe', 'keydown', toggleSidebar);

  function handleSearchChange(e) {
    setInputValue(e.currentTarget.value);
  }

  function handleSearchKeydown(e) {
    e.stopPropagation();
  }

  return (
    <Box display="grid" gridTemplateColumns={showSidebar ? 'minmax(180px, 15%) 1fr' : '1fr'}>
      {showSidebar ? (
        <Box p="400">
          <Box as="h1" fontSize="200">
            {config.title || 'Libra'}
          </Box>
          <Box>
            <input
              type="text"
              value={inputValue}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeydown}
              placeholder="Search"
            />
          </Box>
          <Box as="nav" pt="400">
            <SearchContext.Provider value={inputValue.toLowerCase()}>
              <Navigation items={navItems} />
            </SearchContext.Provider>
          </Box>
        </Box>
      ) : null}
      <Box height="100vh" p="400">
        <Box
          id="libra-iframe"
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
