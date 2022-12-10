import { createContext } from 'react';

export const SUPPORTED_FILES = {
  'text/*': ['.txt', '.md', '.csv', '.tsv', '.xml', '.json'],
  'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.svg'],
  'video/*': ['.mp4', '.mov', '.avi', '.wmv', '.flv', '.webm'],
  'audio/*': ['.mp3', '.wav', '.ogg', '.flac', '.aac'],
  'application/pdf': ['.pdf'],
};

export const PING_INTERVAL = 30000;

export function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}

export const PROD_HOST = `${import.meta.env.VITE_PROD_HOST}:4040`;
export const DEV_HOST = `${import.meta.env.VITE_DEV_HOST}:4040`;

/**
 * @type {React.Context<RSWSClient>}
 */
export const WebSocketContext = createContext(null);

export const COMMANDS = [
  { name: 'help', description: 'List all commands' },
  { name: 'clear', description: 'Clear the chat' },
  { name: 'me', description: 'Send an action message' },
  { name: 'nick', description: 'Change your nickname' },
  { name: 'join', description: 'Join a channel' },
  { name: 'leave', description: 'Leave a channel' },
  { name: 'msg', description: 'Send a private message to a user' },
  { name: 'whois', description: 'Get information about a user' },
  { name: 'invite', description: 'Invite a user to a channel' },
  { name: 'kick', description: 'Kick a user from a channel' },
  { name: 'ban', description: 'Ban a user from a channel' },
  { name: 'unban', description: 'Unban a user from a channel' },
  { name: 'topic', description: 'Change the topic of a channel' },
  { name: 'mode', description: 'Change the mode of a channel' },
  { name: 'op', description: 'Give a user operator status' },
  { name: 'deop', description: 'Remove a user\'s operator status' },
  // { name: 'voice', description: 'Give a user voice status' },
  // { name: 'devoice', description: 'Remove a user\'s voice status' },
  { name: 'ignore', description: 'Ignore a user' },
  { name: 'unignore', description: 'Unignore a user' },
  { name: 'ignorelist', description: 'List all ignored users' },
  { name: 'away', description: 'Set your away status' },
  { name: 'back', description: 'Set your status to back' },
  { name: 'who', description: 'Display information about you' },
  { name: 'names', description: 'List all users in a channel' },
  { name: 'list', description: 'List all channels' },
  { name: 'time', description: 'Get the current time' },
  { name: 'version', description: 'Get the current version' },
  { name: 'ping', description: 'Ping the server' },
  { name: 'quit', description: 'Disconnect from the server' },
];
