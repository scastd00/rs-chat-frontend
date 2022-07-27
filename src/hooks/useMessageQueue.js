import { useRef, useState } from 'react';

export default function useMessageQueue() {
  const [messages, setMessages] = useState([]);
  const ref = useRef([]);
  ref.current = messages;

  function addMessage(message) {
    setMessages([message, ...messages]);
  }

  return {
    addMessage,
    messages
  }
}
