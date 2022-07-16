import { logOut } from '../actions';

export function headers(__token__) {
  return {
    headers: {
      Authorization: 'Bearer ' + __token__
    }
  }
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
