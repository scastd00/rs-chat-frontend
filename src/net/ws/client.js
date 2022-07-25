let WebSocketClient = require('websocket').client;

let socket = new WebSocketClient();
let firstMessage = true;
let counter = 4;

socket.on('connectFailed', function(error) {
  console.log('Connect Error: ' + error.toString());
});

socket.on('connect', function(connection) {
  console.log('WebSocket Client Connected');
  connection.on('error', function(error) {
    console.log('Connection Error: ' + error.toString());
  });
  connection.on('close', function() {
    console.log('echo-protocol Connection Closed');
  });
  connection.on('message', function(message) {
    if (message.type === 'utf8') {
      if (message.utf8Data.indexOf('W') === 0) {
        console.log('Received: ' + message.utf8Data);
      } else {
        const decoded = JSON.parse(message.utf8Data);
        console.log(`Received from ${decoded.headers.username}: '` + decoded.body.content + '\'');
      }
    }
  });

  function sendNumber() {
    if (connection.connected) {
      let pid = process.pid;

      const first = {
        headers: {
          username: `Process ${pid}`,
          chatId: 'c-1',
          dateSignIn: 484029384028409,
          type: 'NEW_USER',
        },
        body: {
          encoding: 'UTF-8',
          content: 'Hello, I am a client',
        },
      };
      const moreMessages = {
        headers: {
          username: `Process ${pid}`,
          chatId: 'c-1',
          dateSignIn: 484029384028409,
          type: 'TEXT_MESSAGE',
        },
        body: {
          encoding: 'UTF-8',
          content: Date.now().toString(16),
        },
      };

      if (--counter === 0) {
        const endJson = {
          headers: {
            username: `Process ${pid}`,
            chatId: 'c-1',
            dateSignIn: 484029384028409,
            type: 'END_CONNECTION',
          },
          body: {
            encoding: 'UTF-8',
            content: 'Goodbye, I was a client',
          },
        }
        const msg = JSON.stringify(endJson);
        connection.sendUTF(msg);
        process.exit(0);
      }

      let json = JSON.stringify(firstMessage ? first : moreMessages);
      firstMessage = false;
      // console.log('I sent: ', json);
      connection.sendUTF(json);
      setTimeout(sendNumber, 4000);
    }
  }

  sendNumber();
});

socket.connect('ws://localhost:9090/');
