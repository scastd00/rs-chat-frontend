# RS Chat

## Description

This application provides a simple chat that allows users to comunicate with each other by using WebSockets.
The chats are divided into:

- Degree chats
  - Where all users of a degree can comunicate with each other.
- Subject chats
  - Where all users of a subject can comunicate with each other.
- Group chats
  - Where all users of a group can comunicate with each other.
- Individual chats
  - Where any two users can comunicate with each other.

Users can send any type of message including text, images, videos, audio, files, etc. All of these messages are
stored in a _bucket_ (provided by the AWS S3 service). They are retrieved from the bucket when a user
connects to any chat.

## Tech Stack

- ViteJS
- React
- Redux
- React Router
- Material UI
- Axios
- Cors
- Dateformat
- Express (for a small server to serve the frontend)
- PropTypes
- React-router-dom
- React-dropzone
- React-spinners
- Redux-persist
