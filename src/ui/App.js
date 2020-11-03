import config from '__LIBBY_CONFIG__';
import React from 'react';
import { Router } from '@reach/router';
import Theme from '@sweatpants/theme';
import Box from '@sweatpants/box';
import { theme } from './theme';
import { bus } from '../api';
import SearchContext from './context/SearchContext';
import useWindowEvent from './hooks/useWindowEvent';
import useIframeEvent from './hooks/useIframeEvent';
import useWindow from './hooks/useWindow';
import Navigation from './components/Navigation';
import Input from './components/Input';

function App() {
  const [navItems, setNavItems] = React.useState({});
  const [showSidebar, setShowSidebar] = React.useState(true);
  const [inputValue, setInputValue] = React.useState('');
  const inputRef = React.useRef();
  const environment = useWindow();
  const search = environment?.location?.search;

  console.log({ search, navItems });

  bus.on('set_entries', setNavItems);
  bus.emit('load_entry', search);

  // function handleKeyEvents(e) {
  //   if (e.keyCode === 83) {
  //     setShowSidebar(!showSidebar);
  //   }

  //   if (e.keyCode === 70) {
  //     inputRef.current.focus();
  //   }
  // }

  // useWindowEvent('keydown', handleKeyEvents);
  // useIframeEvent('libby-iframe', 'keydown', handleKeyEvents);

  // function handleSearchChange(e) {
  //   setInputValue(e.currentTarget.value);
  // }

  // function handleSearchKeydown(e) {
  //   e.stopPropagation();
  // }

  return (
    <Box display="grid" gridTemplateColumns={showSidebar ? 'minmax(200px, 15%) 1fr' : '1fr'}>
      {showSidebar ? (
        <Box height="100%">
          <Box as="h1" fontSize="200" m="0" my="400" px="300">
            {config.title || 'Libby'}
          </Box>
          <Box mb="200" px="300">
            <Input
              type="text"
              value={inputValue}
              // onChange={handleSearchChange}
              // onKeyDown={handleSearchKeydown}
              placeholder="Search"
              ref={inputRef}
            />
          </Box>
          <Box px="300">
            <Box as="nav">
              <SearchContext.Provider value={inputValue.toLowerCase()}>
                <Navigation items={navItems} />
              </SearchContext.Provider>
            </Box>
          </Box>
        </Box>
      ) : null}
      <Box height="100vh" p="500">
        <Box
          id="libby-iframe"
          as="iframe"
          src={`${environment.location.origin}/iframe.html`}
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
