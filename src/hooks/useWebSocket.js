import { useState } from 'react';
import RSWSClient from '../net/ws/RSWSClient';

/**
 * Hook to manage the WebSocket connection to the server. It creates
 * an instance of the WebSocket and if the page is refreshed, the
 * session is closed and reopened.
 *
 * @param username name of the user currently connected.
 * @param chatId chat to which the user is connecting.
 * @param sessionId id of the session of the current user.
 * @param __token__ access token of the current user.
 *
 * @returns {{isConnected: (function(): boolean), getClient: (function(): RSWSClient)}}
 */
export const useWebSocket = (username, chatId, sessionId, __token__) => {
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);

  const getClient = () => {
    if (socket === null) {
      setSocket(new RSWSClient(username, chatId, sessionId, __token__));
      setConnected(true);
    }

    return socket;
  };

  const isConnected = () => connected;

  return { getClient, isConnected };
};
