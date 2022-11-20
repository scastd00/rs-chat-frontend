import { createReducer } from '@reduxjs/toolkit';
import { changeTheme } from '../actions';

const initialState = { isDarkTheme: true };

export const themeReducer = createReducer(initialState, (builder) => {
  builder.addCase(changeTheme, (state, _action) => {
    state.isDarkTheme = !state.isDarkTheme;
  });
});
