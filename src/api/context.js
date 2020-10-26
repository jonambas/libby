import React from 'react';
import { bus } from '../api';

export const STORE = React.createContext();

export function StoreProvider(props) {
  const { api, children } = props;
  const [entries, setEntries] = React.useState({});

  React.useEffect(() => {
    console.log(api.getEntries());
    setEntries(api.getEntries());
  }, []);

  // function setStore(options) {
  //   // console.log('set store', options);
  // }

  // function add(story) {
  //   setState({ ...state, stories: [...state.stories, story] });
  // }

  // bus.on('ADD', function (story) {
  //   // console.log('[Context Add]', story);
  //   // setState({ ...state, stories: { ...state.stories, [story.key]: story } });
  // });

  // console.log('[Provider]');

  return <STORE.Provider value={{ entries }}>{children}</STORE.Provider>;
}
