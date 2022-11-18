import { createAction } from '@reduxjs/toolkit';
import {
  CHANGE_THEME,
  LOG_OUT,
  SET_AVAILABLE_CHATS,
  SET_CHAT_KEY,
  SET_SESSION_ID,
  SET_USER,
  SET_USER_TOKEN,
} from './constants';

export const setUser = createAction(SET_USER, user => {
  return { payload: user };
});

export const setSessionId = createAction(SET_SESSION_ID, sessionId => {
  return { payload: sessionId };
});

export const setToken = createAction(SET_USER_TOKEN, token => {
  return { payload: token };
});

export const setAvailableChats = createAction(SET_AVAILABLE_CHATS, chats => {
  return { payload: chats };
});

export const logOut = createAction(LOG_OUT);

export const changeTheme = createAction(CHANGE_THEME);

export const setChatKey = createAction(SET_CHAT_KEY, key => {
  return { payload: key };
});
