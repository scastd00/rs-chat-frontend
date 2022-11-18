import { createReducer } from '@reduxjs/toolkit';
import { setChatKey } from '../actions';

const initialState = {
  key: '',
};

export const chatReducer = createReducer(initialState, builder => {
  builder
    .addCase(setChatKey, (state, action) => {
      state.key = action.payload;
    });
});
