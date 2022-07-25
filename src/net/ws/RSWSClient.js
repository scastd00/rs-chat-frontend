function RSWSClient(username, chatId, __token__) {
  const url = import.meta.env.PROD
    ? 'ws://spring-chat-backend.herokuapp.com:9090'
    : 'ws://localhost:9090';

  this.hasSentFirstMessage = false;
  this.socket = new WebSocket(url);
  this.username = username;
  this.chatId = chatId;
  this.__token__ = __token__;

  this.init();
}

RSWSClient.prototype.sendInitialMessage = function() {
  if (!this.hasSentFirstMessage) {
    this.send({
      headers: {
        username: this.username,
        chatId: this.chatId,
        dateSignIn: 0,
        type: 'NEW_USER',
        Authentication: null,
      },
      body: {
        encoding: 'UTF-8',
        content: 'Hi',
      },
    });

    this.hasSentFirstMessage = true;
  }
}

RSWSClient.prototype.init = function() {
  // Todo: function to parse messages (base64 -> binary)
  this.socket.onmessage = (message) => {
    console.log(message);
  };

  this.socket.onopen = () => {
    this.sendInitialMessage();
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

export default RSWSClient;
