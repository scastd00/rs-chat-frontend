import { useState } from 'react';
import RSWSClient from '../net/ws/RSWSClient';

/**
 * Hook to manage the WebSocket connection to the server. It creates
 * an instance of the WebSocket and if the page is refreshed, the
 * session is closed and reopened.
 */
export const useWebSocket = (username, chatId, __token__) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  const getClient = () => {
    if (socket === null) {
      setSocket(new RSWSClient(username, chatId, __token__));
      setConnected(true);
    }

    return socket;
  };

  const isConnected = () => connected;

  return { getClient, isConnected };
};
