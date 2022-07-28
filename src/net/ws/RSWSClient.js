import { USER_CONNECTED, USER_DISCONNECTED, UTF_8 } from './MessageProps';
import { createMessage } from '../../utils';

function RSWSClient(username, chatId, sessionId, __token__) {
  const url = import.meta.env.PROD
    ? 'wss://rschat-ws-back.herokuapp.com'
    : 'ws://localhost:9090';

  this.hasSentFirstMessage = false;
  this.ready = false;
  this.socket = new WebSocket(url);
  this.username = username;
  this.chatId = chatId;
  this.sessionId = sessionId;
  this.__token__ = __token__;

  /**
   *
   * @param type
   * @param message
   * @param encoding
   * @returns {{headers: {username: string, chatId: string, sessionId: number, type: string, date: number, token: string}, body: {encoding: string, content: string}}}
   */
  this.defaultServerMessage = (type, message, encoding = UTF_8) => {
    return createMessage(this.username, this.chatId, this.sessionId, type, this.__token__, message, encoding);
  };

  this.init();
}

RSWSClient.prototype.init = function() {
  this.socket.onopen = () => {
    this.ready = true;

    if (!this.hasSentFirstMessage) {
      this.send(this.defaultServerMessage(USER_CONNECTED, 'Hi'));

      this.hasSentFirstMessage = true;
    }
  };
};

/**
 * Sends a message to the connected server (string or JSON).
 *
 * @param {string|object} message message to send.
 */
RSWSClient.prototype.send = function(message) {
  if (typeof message === 'string') {
    this.socket.send(message);
  } else if (typeof message === 'object') {
    this.socket.send(JSON.stringify(message));
  } else {
    alert('Could not send message (type must be a string or an object)');
  }
};

/**
 * Disconnects the user from the server sending a message
 */
RSWSClient.prototype.disconnect = function() {
  this.ready = false;

  this.send(this.defaultServerMessage(USER_DISCONNECTED, 'Bye'));

  this.socket.close(1000, 'Disconnected'); // Todo: send more detailed message
};

/**
 * Establishes a function that will be executed each time the socket
 * receives a message.
 *
 * @param {function(string): void} callback function to execute when
 * receiving a message.
 */
RSWSClient.prototype.onMessage = function(callback) {
  // Todo: function to parse messages (base64 -> binary)

  this.socket.onmessage = function(message) {
    callback(JSON.parse(message.data));
  };
};

RSWSClient.prototype.isReady = function() {
  return this.ready;
};

export default RSWSClient;
