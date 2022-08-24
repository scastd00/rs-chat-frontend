import {
  ACTIVE_USERS_MESSAGE,
  ERROR_MESSAGE,
  GET_HISTORY_MESSAGE,
  TEXT_MESSAGE,
  USER_JOINED,
  USER_LEFT,
} from './MessageProps';
import { createMessage, isActivityMessage } from '../../utils';

function RSWSClient(username, chatId, sessionId, __token__) {
  const url = import.meta.env.PROD
    ? 'wss://rschat-ws-back.herokuapp.com/ws/rschat'
    : 'ws://localhost:8080/ws/rschat';

  this.socket = new WebSocket(url);
  this.username = username;
  this.chatId = chatId;
  this.sessionId = sessionId;
  this.__token__ = __token__;

  this.socket.onopen = () => {
    // Only executed one time
    this.send(
      createMessage(
        this.username,
        this.chatId,
        this.sessionId,
        USER_JOINED,
        this.__token__,
        'Hi',
      ),
    );

    this.send('', GET_HISTORY_MESSAGE);
    this.send('', ACTIVE_USERS_MESSAGE);
  };
}

/**
 * Sends a message to the connected server (string or JSON).
 *
 * @param {string|object} message message to send.
 * @param {string} type
 */
RSWSClient.prototype.send = function(message, type = TEXT_MESSAGE) {
  if (this.socket.readyState !== WebSocket.OPEN) {
    return false; // Do not send anything
  }

  let msgToSend;

  if (typeof message === 'string') {
    msgToSend = JSON.stringify(this.prepareMessage(message, type));
  } else if (typeof message === 'object') {
    msgToSend = JSON.stringify(message);
  } else {
    alert('Could not send message (type must be a string or an object)');

    return false;
  }

  this.socket.send(msgToSend);
  return true;
};

/**
 * Disconnects the user from the server sending a message.
 */
RSWSClient.prototype.disconnect = function() {
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

  this.socket.close(1000, 'Disconnected'); // Todo: send more detailed message
};

/**
 * Establishes a function that will be executed each time the socket
 * receives a message.
 *
 * @param {function(string): void} displayCallback function to execute when
 * receiving a message.
 * @param {function(): void} errorCallback function to execute when an
 * error message is received.
 * @param {function(string[]): void} activeUsersCallback
 * @param {function(string[]): void} historyCallback
 */
RSWSClient.prototype.onMessage = function(
  displayCallback, errorCallback, activeUsersCallback, historyCallback,
) {
  // Todo: function to parse messages (base64 -> binary)

  this.socket.onmessage = (message) => {
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
    } else {
      displayCallback(parsedMessage);

      // If the message is an activity message (USER_JOINED | USER_LEFT), send a message
      // to the server to get the updated list of active users.
      if (isActivityMessage(headers.type)) {
        this.send('', ACTIVE_USERS_MESSAGE);
      }
    }
  };
};

RSWSClient.prototype.prepareMessage = function(message, type) {
  return createMessage(this.username, this.chatId, this.sessionId, type, this.__token__, message);
};

export default RSWSClient;
