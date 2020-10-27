import React from 'react';
import { bus } from '../api';

export const STORE = React.createContext();

export function StoreProvider(props) {
  const { api, children } = props;
  const [entries, setEntries] = React.useState({});

  React.useEffect(() => {
    setEntries(api.getEntries());
  }, []);

  const firstEntry = React.useMemo(() => {
    const firstKind = entries[Object.keys(entries)[0]];
    if (firstKind) {
      return firstKind[0];
    }
    return {};
  }, [entries]);

  // When entries change, strips render function and sends entry data to UI
  React.useEffect(() => {
    const data = Object.keys(entries).map((key) => {
      return entries[key].map(({ render, ...entry }) => entry);
    });
    bus.emit('set_entries', data);
  }, [entries]);

  // When receiving navigation events, set iframe search params
  React.useEffect(() => {
    bus.on('load_entry', (search) => {
      window.location.search = search;
    });
  }, []);

  // Finds active entry based on window search params
  const activeEntry = React.useMemo(() => {
    const activeKey = window.location.search.replace('?path=', '');
    const kind = activeKey.split('__').shift();

    if (kind && entries[kind]) {
      return entries[kind].find(({ key }) => key === activeKey);
    }
    return firstEntry;
  }, [window.location.search, entries]);

  return <STORE.Provider value={{ entries, firstEntry, activeEntry }}>{children}</STORE.Provider>;
}
