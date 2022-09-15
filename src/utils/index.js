import { logOut } from '../actions';
import { USER_JOINED, USER_LEFT, USER_MESSAGES } from '../net/ws/MessageProps';
import dateFormat from 'dateformat';

export function headers(__token__) {
  return {
    headers: {
      Authorization: 'Bearer ' + __token__,
    },
  };
}

export function fullPrettyDate(date) {
  return dateFormat(date);
}

export function prettyDate(date) {
  return dateFormat(date, 'HH:MM');
}

export function parseDateForInput(date) {
  return dateFormat(date, 'isoDate');
}

/**
 *
 * @param error - full error from the server
 * @param navigate - function to navigate to a new page
 * @param dispatch - function to dispatch an action
 */
export function checkResponse(error, navigate, dispatch) {
  const { response } = error;

  if (response.status === 403) {
    // FORBIDDEN
    console.log('checkResponse: 403');

    dispatch(logOut());
    navigate('/login');
  } else if (response.status === 401) {
    // UNAUTHORIZED
    console.log('checkResponse: 401');

    navigate('/error');
  }
}

/**
 *
 * @param {string} username
 * @param {string} chatId
 * @param {number} sessionId
 * @param {string} type
 * @param {string} token
 * @param {string} content
 * @returns {{headers: {username: string, chatId: string, sessionId: number, type: string, date: number, token: string}, body: {content: string}}}
 */
export function createMessage(username, chatId, sessionId, type, token, content) {
  return {
    headers: {
      username,
      chatId,
      sessionId,
      type,
      date: Date.now(),
      token: `Bearer ${token}`,
    },
    body: {
      content,
    },
  };
}

export function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function isActivityMessage(type) {
  return type === USER_JOINED || type === USER_LEFT;
}

export function isUserMessage(type) {
  return USER_MESSAGES.includes(type);
}

export function encodeBase64(str) {
  return btoa(str);
}

export function decodeBase64(str) {
  return atob(str);
}
