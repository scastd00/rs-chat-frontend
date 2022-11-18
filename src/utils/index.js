import { logOut } from '../actions';
import { USER_JOINED, USER_LEFT, USER_MESSAGES } from '../net/ws/MessageTypes';
import dateFormat from 'dateformat';
import dayjs from 'dayjs';

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

/**
 * Formats the date with ISO 8601 format.
 *
 * @param {dayjs.Dayjs} dayjs - The date to format.
 * @returns {string} The formatted date.
 */
export function isoDate(dayjs) {
  return dayjs.format();
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
      date: dayjs().valueOf(),
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

export function getEmojiFromUnicode(unicode) {
  return unicode.split(' ')
                .map(u => String.fromCodePoint(parseInt(u, 16)))
                .join('');
}
