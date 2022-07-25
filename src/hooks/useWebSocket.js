import { useState } from 'react';
import RSWSClient from '../net/ws/RSWSClient';

/**
 * Hook to manage the WebSocket connection to the server. It creates
 * an instance of the WebSocket and if the page is refreshed, the
 * session is closed and reopened.
 *
 * @returns {{getSocket: (function(): RSWSClient)}}
 */
export const useWebSocket = () => {
  const [socket, setSocket] = useState(null);

  const getSocket = () => {
    if (socket === null) {
      setSocket(new RSWSClient());
    }

    return socket;
  };

  return { getSocket };
};
