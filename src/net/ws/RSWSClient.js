import { USER_CONNECTED, USER_DISCONNECTED } from './MessageType';

function RSWSClient(username, chatId, sessionId, __token__) {
  const url = import.meta.env.PROD
    ? 'ws://spring-chat-backend.herokuapp.com:9090'
    : 'ws://localhost:9090';

  this.hasSentFirstMessage = false;
  this.socket = new WebSocket(url);
  this.username = username;
  this.chatId = chatId;
  this.sessionId = sessionId;
  this.__token__ = __token__;
  this.ready = false;

  this.messageQueue = [];

  this.init();
}

RSWSClient.prototype.init = function() {
  this.socket.onopen = () => {
    this.ready = true;

    if (!this.hasSentFirstMessage) {
      this.send({
        headers: {
          username: this.username,
          chatId: this.chatId,
          sessionId: this.sessionId,
          type: USER_CONNECTED,
          token: this.__token__,
        },
        body: {
          encoding: 'UTF-8',
          content: 'Hi',
        },
      });

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

RSWSClient.prototype.disconnect = function() {
  this.send({
    headers: {
      username: this.username,
      chatId: this.chatId,
      sessionId: this.sessionId,
      type: USER_DISCONNECTED,
      token: this.__token__,
      // date: null,
    },
    body: {
      encoding: 'UTF-8',
      content: 'Bye',
    },
  });

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
    callback(message.data);
  };
};

RSWSClient.prototype.isReady = function() {
  return this.ready;
};

export default RSWSClient;
