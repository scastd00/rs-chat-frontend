import { createReducer } from '@reduxjs/toolkit';
import { logOut, setAvailableChats, setSessionId, setToken, setUser } from '../actions';

const initialState = {
  user: {},
  token: '',
  sessionId: -1,
  chats: {},
};

export const userReducer = createReducer(initialState, builder => {
  builder
    .addCase(setUser, (state, action) => {
      state.user = action.payload; // Set the new user
    })
    .addCase(setSessionId, (state, action) => {
      state.sessionId = action.payload; // Set the session id
    })
    .addCase(setToken, (state, action) => {
      state.token = action.payload; // Set the new user token
    })
    .addCase(setAvailableChats, (state, action) => {
      state.chats = action.payload; // Set the chats the user can access
    })
    .addCase(logOut, state => {
      state.user = {};
      state.token = '';
      state.sessionId = -1;
      state.chats = [];
      // Clear the user in the app
    });
});
