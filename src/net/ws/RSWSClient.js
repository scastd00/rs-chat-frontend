import {
  ACTIVE_USERS_MESSAGE,
  ERROR_MESSAGE,
  GET_HISTORY_MESSAGE,
  PING_MESSAGE,
  PONG_MESSAGE,
  TEXT_MESSAGE,
  USER_JOINED,
  USER_LEFT,
} from './MessageProps';
import { createMessage, isActivityMessage } from '../../utils';
import { DEV_HOST, PING_INTERVAL, PROD_HOST } from '../../utils/constants';

function RSWSClient(username, chatId, sessionId, __token__) {
  const url = import.meta.env.PROD
    ? `wss://${PROD_HOST}/ws/rschat`
    : `wss://${DEV_HOST}/ws/rschat`;

  this.socket = new WebSocket(url);
  this.username = username;
  this.chatId = chatId;
  this.sessionId = sessionId;
  this.__token__ = __token__;
  this.pingInterval = null;
  this.connected = false;

  this.socket.onopen = () => {
    this.connect();
  };
}

/**
 * Sends a messageContent to the connected server (string or JSON).
 *
 * @param {string|object} messageContent messageContent to send.
 * @param {string} type
 */
RSWSClient.prototype.send = function(messageContent, type = TEXT_MESSAGE) {
  if (this.socket.readyState !== WebSocket.OPEN || !this.connected) {
    return false; // Do not send anything
  }

  let msgToSend;

  if (typeof messageContent === 'string') {
    msgToSend = JSON.stringify(this.prepareMessage(messageContent, type));
  } else if (typeof messageContent === 'object') {
    msgToSend = JSON.stringify(messageContent);
  } else {
    alert('Could not send messageContent (type must be a string or an object)');

    return false;
  }

  this.socket.send(msgToSend);
  return true;
};

RSWSClient.prototype.connect = function() {
  if (!this.connected) {
    this.connected = true;

    // Only executed one time
    this.send('Hi', USER_JOINED);
    this.send('', GET_HISTORY_MESSAGE);
    this.send('', ACTIVE_USERS_MESSAGE);

    this.pingInterval = setInterval(() => {
      this.send('I send a ping message', PING_MESSAGE);
    }, PING_INTERVAL);
  }
};

/**
 * Disconnects the user from the server sending a message.
 */
RSWSClient.prototype.disconnect = function() {
  if (!this.connected) {
    return;
  }

  clearInterval(this.pingInterval);

  this.send(
    createMessage(
      this.username,
      this.chatId,
      this.sessionId,
      USER_LEFT,
      this.__token__,
      'Bye',
    ),
  );

  this.connected = false;
  this.socket.close(1000, 'Disconnected');
};

/**
 * Establishes a function that will be executed each time the socket
 * receives a message.
 *
 * @param {function(string): void} displayCallback function to execute when receiving a message.
 * @param {function(): void} errorCallback function to execute when an error message is received.
 * @param {function(string[]): void} activeUsersCallback function to execute to show the active users.
 * @param {function(string[]): void} historyCallback function to send the history of the chat as parameter.
 * @param {function(): void} playSoundOnMessage function to execute when a message is received.
 */
RSWSClient.prototype.onMessage = function(
  displayCallback, errorCallback, activeUsersCallback, historyCallback, playSoundOnMessage,
) {
  this.socket.onmessage = (message) => {
    if (!this.connected) {
      return;
    }

    const parsedMessage = JSON.parse(message.data);
    const { headers, body } = parsedMessage;

    if (headers.type === ERROR_MESSAGE) {
      errorCallback();
    } else if (headers.type === ACTIVE_USERS_MESSAGE) {
      // String containing an array of usernames
      activeUsersCallback(JSON.parse(body.content));
    } else if (headers.type === GET_HISTORY_MESSAGE) {
      const messages = JSON.parse(body.content);
      historyCallback(messages);
    } else if (headers.type === PONG_MESSAGE) {
      // Do nothing
    } else {
      displayCallback(parsedMessage);
      playSoundOnMessage();

      // If the message is an activity message (USER_JOINED | USER_LEFT), send a message
      // to the server to get the updated list of active users.
      if (isActivityMessage(headers.type)) {
        this.send('', ACTIVE_USERS_MESSAGE);
      }
    }
  };
};

RSWSClient.prototype.prepareMessage = function(content, type) {
  return createMessage(this.username, this.chatId, this.sessionId, type, this.__token__, content);
};

export default RSWSClient;
