import { createAction } from '@reduxjs/toolkit';
import { CHANGE_THEME, LOG_OUT, SET_USER, SET_USER_TOKEN } from './constants';

export const setUser = createAction(SET_USER, (user) => {
  return { payload: user };
});

export const setTokens = createAction(SET_USER_TOKEN, (tokens) => {
  return { payload: tokens };
});

export const logOut = createAction(LOG_OUT);
export const changeTheme = createAction(CHANGE_THEME);
