import dayjs from 'dayjs';

class Message {
  constructor(username, chatId, sessionId, type, __token__, content) {
    this.username = username;
    this.chatId = chatId;
    this.sessionId = sessionId;
    this.type = type;
    this.date = dayjs().valueOf();
    this.__token__ = __token__;
    this.content = content;
  }
}
