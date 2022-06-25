import { createReducer } from '@reduxjs/toolkit';
import { logOut, setTokens, setUser } from '../actions';

export const userReducer = createReducer({ user: {}, tokens: {} }, (builder) => {
  builder
    .addCase(setUser, (state, action) => {
      state.user = action.payload; // Set the new user
    })
    .addCase(setTokens, (state, action) => {
      state.tokens = action.payload; // Set the new user tokens (access and refresh)
    })
    .addCase(logOut, (state, _action) => {
      state.user = {};
      state.tokens = {};
      // Clear the user in the app
    });
});
