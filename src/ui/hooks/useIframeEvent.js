import React from 'react';

function useIframeEvent(id, event, callback) {
  React.useEffect(() => {
    if (document.getElementById(id)) {
      document.getElementById(id).contentWindow.document.addEventListener(event, callback);
    }

    return () => {
      document.getElementById(id).contentWindow.document.removeEventListener(event, callback);
    };
  }, [event, callback]);
}

export default useIframeEvent;
