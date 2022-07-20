import { logOut } from '../actions';

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
  } else if (typeof date === 'string') {
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
 * @param response - response from the server
 * @param navigate - function to navigate to a new page
 * @param dispatch - function to dispatch an action
 */
export function checkResponse(response, navigate, dispatch) {
  console.log('checkResponse');

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
