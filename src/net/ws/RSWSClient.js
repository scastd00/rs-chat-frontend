function RSWSClient(clientName, chatId = null) {
  this.clientName = clientName;
  this.chatId = chatId;

  this.getSocket = () => {
    return this.socket;
  };
}

RSWSClient.prototype.connect = function() {
  const url = 'ws://localhost:9090';
  this.socket = new WebSocket(url);
}

export default RSWSClient;
