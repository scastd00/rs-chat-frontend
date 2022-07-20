import React from 'react';
import { MESSAGE_TYPES as MT } from '../utils/constants';
import TextChatCard from './cards/TextChatCard';
import ImageChatCard from './cards/ImageChatCard';
import AudioChatCard from './cards/AudioChatCard';
import VideoChatCard from './cards/VideoChatCard';
import ErrorChatCard from './cards/ErrorChatCard';

function ChatMessage({ data, type }) {
  switch (type) {
    case MT.TEXT:
      return <TextChatCard text={data.text} username={data.username} date={data.date} />;

    case MT.IMAGE:
      return <ImageChatCard />;

    case MT.AUDIO:
      return <AudioChatCard />;

    case MT.VIDEO:
      return <VideoChatCard />;

    default:
      return <ErrorChatCard />;
  }
}

export default ChatMessage;
