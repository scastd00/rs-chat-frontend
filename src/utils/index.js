import { logOut } from '../actions';
import { USER_MESSAGES, UTF_8 } from '../net/ws/MessageProps';

export function headers(__token__) {
  return {
    headers: {
      Authorization: 'Bearer ' + __token__,
    },
  };
}

function dateParams(date) {
  // Prevent instantiation of Date objects if the parameter is already a Date object
  let dateObj = date;

  // Get the current date if parameter is null or undefined
  if (date === null || date === undefined) {
    dateObj = new Date();
  } else if (typeof date === 'string' || typeof date === 'number') {
    dateObj = new Date(date);
  }

  return {
    day: dateObj.getDate().toString().padStart(2, '0'),
    month: (dateObj.getMonth() + 1).toString().padStart(2, '0'),
    year: dateObj.getFullYear().toString().padStart(4, '0'),
    hour: dateObj.getHours().toString().padStart(2, '0'),
    minute: dateObj.getMinutes().toString().padStart(2, '0'),
    second: dateObj.getSeconds().toString().padStart(2, '0'),
  };
}

export function prettyDate(date) {
  const { day, month, year, hour, minute, second } = dateParams(date);
  return `${day}-${month}-${year} ${hour}:${minute}:${second}`;
}

export function parseDateForInput(date) {
  const { day, month, year } = dateParams(date);
  return `${year}-${month}-${day}`;
}

/**
 *
 * @param error - full error from the server
 * @param navigate - function to navigate to a new page
 * @param dispatch - function to dispatch an action
 */
export function checkResponse(error, navigate, dispatch) {
  console.log('checkResponse');
  const response = error.response;

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
 * @param {string} encoding
 * @returns {{headers: {username: string, chatId: string, sessionId: number, type: string, date: number, token: string}, body: {encoding: string, content: string}}}
 */
export function createMessage(username, chatId, sessionId,
                              type, token, content, encoding = UTF_8) {
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
      encoding,
      content,
    },
  };
}

export function isUserMessage(type) {
  return USER_MESSAGES.includes(type);
}
