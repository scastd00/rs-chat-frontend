import { TEXT_MESSAGE, USER_JOINED, USER_LEFT } from './MessageProps';
import { createMessage } from '../../utils';

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
  };
}

/**
 * Sends a message to the connected server (string or JSON).
 *
 * @param {string|object} message message to send.
 */
RSWSClient.prototype.send = function(message) {
  if (typeof message === 'string') {
    this.socket.send(
      JSON.stringify(
        createMessage(this.username, this.chatId, this.sessionId, TEXT_MESSAGE, this.__token__, message),
      ),
    );
  } else if (typeof message === 'object') {
    this.socket.send(JSON.stringify(message));
  } else {
    alert('Could not send message (type must be a string or an object)');
  }
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
 * @param {function(string): void} callback function to execute when
 * receiving a message.
 */
RSWSClient.prototype.onMessage = function(callback) {
  // Todo: function to parse messages (base64 -> binary)

  this.socket.onmessage = function(message) {
    callback(JSON.parse(message.data));
  };
};

export default RSWSClient;
