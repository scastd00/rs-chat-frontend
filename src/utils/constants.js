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
