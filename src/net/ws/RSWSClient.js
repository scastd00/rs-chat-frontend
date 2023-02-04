import {
  ACTIVE_USERS_MESSAGE,
  ERROR_MESSAGE,
  GET_HISTORY_MESSAGE,
  MENTION_MESSAGE,
  PING_MESSAGE,
  PONG_MESSAGE,
  TEXT_MESSAGE,
  TOO_FAST_MESSAGE,
  USER_CONNECTED,
  USER_DISCONNECTED,
  USER_JOINED,
  USER_LEFT,
} from './MessageTypes';
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
  this.connectedToChat = false;

  this.socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };

  this.socket.onopen = () => {
    this.connect();
  };
}

RSWSClient.prototype.setUsername = function(username) {
  this.username = username;
};

RSWSClient.prototype.setChatId = function(chatId) {
  this.chatId = chatId;
};

RSWSClient.prototype.setSessionId = function(sessionId) {
  this.sessionId = sessionId;
};

RSWSClient.prototype.setToken = function(__token__) {
  this.__token__ = __token__;
};

/**
 * Sends a messageContent to the connected server (string or JSON).
 *
 * @param {string|object} messageContent messageContent to send.
 * @param {string} type type of the message to send.
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

/**
 * Establishes the connection with the server.
 */
RSWSClient.prototype.connect = function() {
  if (this.connected) {
    return;
  }

  this.connected = true;
  this.send('Connection', USER_CONNECTED);

  this.pingInterval = setInterval(() => {
    this.send('I am a ping message', PING_MESSAGE);
  }, PING_INTERVAL);
};

/**
 * Disconnects the user from the server sending a message.
 */
RSWSClient.prototype.disconnect = function() {
  if (!this.connected) {
    return;
  }

  clearInterval(this.pingInterval);
  this.disconnectFromChat();
  this.send('', USER_DISCONNECTED);

  this.connected = false;
  this.socket.close(1000, 'Disconnected');
};

/**
 * Connects the user to the chat.
 */
RSWSClient.prototype.connectToChat = function() {
  if (!this.connected || this.connectedToChat) {
    return;
  }

  this.connectedToChat = true;

  this.send('', USER_JOINED);
  this.send('0', GET_HISTORY_MESSAGE);
  this.send('', ACTIVE_USERS_MESSAGE);
};

/**
 * Disconnects the user from the chat.
 */
RSWSClient.prototype.disconnectFromChat = function() {
  if (!this.connectedToChat) {
    return;
  }

  this.send('', USER_LEFT);
  this.setUsername('');
  this.setChatId('');
  this.setSessionId('0');
  this.setToken('empty');
  this.connectedToChat = false;
};

/**
 * Establishes a function that will be executed each time the socket
 * receives a message.
 *
 * @param {function(string): void} displayCallback function to execute when receiving a message.
 * @param {function(): void} errorCallback function to execute when an error message is received.
 * @param {function(string[]): void} activeUsersCallback function to execute to show the active users.
 * @param {function(string[]): void} historyCallback function to send the history of the chat as parameter.
 * @param {function(): void} tooFastMessagesCallback function to execute when the user is sending messages too fast.
 * @param {function(): void} playSoundOnMessage function to execute when a message is received.
 * @param {function(): void} playSoundOnMention function to execute when a mention is received.
 */
RSWSClient.prototype.onMessage = function(
  displayCallback, errorCallback, activeUsersCallback,
  historyCallback, tooFastMessagesCallback, playSoundOnMessage, playSoundOnMention,
) {
  this.socket.onmessage = (message) => {
    if (!this.connected) {
      return;
    }

    const parsedMessage = JSON.parse(message.data);
    const { headers, body } = parsedMessage;

    switch (headers.type) {
      case ERROR_MESSAGE:
        errorCallback();
        break;

      case ACTIVE_USERS_MESSAGE:
        // String containing an array of usernames
        activeUsersCallback(JSON.parse(body.content));
        break;

      case GET_HISTORY_MESSAGE:
        historyCallback(JSON.parse(body.content));
        break;

      case TOO_FAST_MESSAGE:
        tooFastMessagesCallback();
        break;

      case PING_MESSAGE:
      case PONG_MESSAGE:
      case USER_CONNECTED:
      case USER_DISCONNECTED:
        // No-op
        break;

      default:
        if (headers.type === MENTION_MESSAGE) {
          playSoundOnMention();
        } else {
          displayCallback(parsedMessage);
          playSoundOnMessage();
        }

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
