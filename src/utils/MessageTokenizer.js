/**
 * Reads every part of a message and returns an array of tokens.
 *
 * @param {string} message - The message to tokenize.
 * @returns {{type: string, value: string}[]} An array of tokens.
 */
function createTokens(message) {
  const tokens = [];
  const splitMessage = message.trim().split(/(\s+)/); // Split on whitespace

  for (const token of splitMessage) {
    if (token.startsWith('/')) {
      tokens.push({ type: 'command', value: token });
    } else if (token.startsWith('@')) {
      tokens.push({ type: 'mention', value: token });
    } else {
      tokens.push({ type: 'text', value: token });
    }
  }

  return tokens;
}

/**
 * Creates an array of messages to send to the server from a string.
 *
 * @param message - The message to split.
 * @returns {*[]} An array of messages.
 */
function createMessagesForString(message) {
  const tokens = createTokens(message);
  const messages = [];
  let textMessage = '';

  // We only create messages and specify the type of the message.
  // The messages are created later with the use of the Message class and
  // sent to the server through the WebSocket.

  for (const token of tokens) {
    textMessage += token.value; // Add the full token (also whitespaces) to the base message

    if (token.type === 'command') {
      messages.push({ type: 'command', value: token.value });
    } else if (token.type === 'mention') {
      messages.push({ type: 'mention', value: token.value });
    } else {
      messages.push({ type: 'text', value: token.value });
    }
  }

  return messages;
}

export {
  createMessagesForString,
};
