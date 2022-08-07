import { createReducer } from '@reduxjs/toolkit';
import { logOut, setSessionId, setTokens, setUser } from '../actions';

export const userReducer = createReducer({ user: {}, tokens: {}, sessionId: -1 }, (builder) => {
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
    .addCase(logOut, (state, _action) => {
      state.user = {};
      state.tokens = {};
      state.sessionId = -1;
      // Clear the user in the app
    });
});
