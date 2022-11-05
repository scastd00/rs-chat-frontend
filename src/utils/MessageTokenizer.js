import { COMMAND_MESSAGE, MENTION_MESSAGE, TEXT_MESSAGE } from '../net/ws/MessageTypes';

/**
 * Reads every part of a message and returns an array of tokens.
 *
 * @param {string} message - The message to tokenize.
 * @returns {{type: string, value: string}[]} An array of tokens.
 */
function createTokens(message) {
  const tokens = [];
  const strings = message.split(/(\s+)/); // Split on whitespace

  strings.filter(str => str.length > 0)
         .forEach(str => {
           switch (str.charAt(0)) {
             case '/':
               tokens.push({ type: COMMAND_MESSAGE, value: str });
               break;
             case '@':
               tokens.push({ type: MENTION_MESSAGE, value: str });
               break;
             default:
               tokens.push({ type: TEXT_MESSAGE, value: str });
           }
         });

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

  // We only create messages and specify the type and value of the message.
  // The messages are created later with the use of the Message class and
  // sent to the server through the WebSocket.

  tokens.forEach(token => {
    textMessage += token.value; // Add the full token (also whitespaces) to the base message

    if (token.type !== TEXT_MESSAGE) {
      messages.push({ type: token.type, value: token.value });
    }
  });

  messages.unshift({ type: TEXT_MESSAGE, value: textMessage });

  // Result array structure:
  // [ text(1), command(*), mention(*), ... ]
  return messages;
}

export {
  createMessagesForString,
};
