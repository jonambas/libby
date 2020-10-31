import React from 'react';

function getWindow() {
  if (typeof window !== 'undefined') {
    return window;
  }
  return {
    matchMedia: () => ({})
  };
}

/**
 * Handles global window event listeners in a reusable hook
 * @param {String} event
 * @param {Func} callback
 *
 * @example
 *  function Component() {
 *    useWindowEvent('resize', handleWindowResize);
 *    ...
 *  }
 */
function useWindowEvent(event, callback) {
  const environment = getWindow();

  React.useEffect(() => {
    environment.addEventListener(event, callback);
    return () => environment.removeEventListener(event, callback);
  }, [event, callback]);
}

export default useWindowEvent;
