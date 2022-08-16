import { createReducer } from '@reduxjs/toolkit';
import { logOut, setAvailableChats, setSessionId, setTokens, setUser } from '../actions';

const initialState = {
  user: {},
  tokens: {},
  sessionId: -1,
  chats: {},
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      state.user = action.payload; // Set the new user
    })
    .addCase(setSessionId, (state, action) => {
      state.sessionId = action.payload; // Set the session id
    })
    .addCase(setTokens, (state, action) => {
      state.tokens = action.payload; // Set the new user tokens (access and refresh)
    })
    .addCase(setAvailableChats, (state, action) => {
      state.chats = action.payload; // Set the chats the user can access
    })
    .addCase(logOut, (state, _action) => {
      state.user = {};
      state.tokens = {};
      state.sessionId = -1;
      state.chats = [];
      // Clear the user in the app
    });
});
