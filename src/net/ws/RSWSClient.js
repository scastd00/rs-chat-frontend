function RSWSClient() {
  const url = import.meta.env.PROD
    ? 'ws://spring-chat-backend.herokuapp.com:9090'
    : 'ws://localhost:9090';

  this.socket = new WebSocket(url);
}

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
