import { createReducer } from '@reduxjs/toolkit';
import { addHistory, goBackHistory, goForwardHistory } from '../actions';

const initialState = {
  past: [],
  present: '',
  future: [],
};

export const historyReducer = createReducer(initialState, builder => {
  builder
    .addCase(addHistory, (state, action) => {
      // Add the new chat key to the present
      // if (state.present === action.payload) {
      //   return state;
      // }
      // console.log(action.payload);

      return {
        past: [...state.past, state.present],
        present: action.payload,
        future: [],
      };
    })
    .addCase(goBackHistory, state => {
      // Go back to the previous chat
      if (state.past.length === 0) {
        return state;
      }

      return {
        past: state.past.slice(0, -1),
        present: state.past.slice(-1)[0],
        future: [state.present, ...state.future],
      };
    })
    .addCase(goForwardHistory, state => {
      // Go forward to the next chat
      if (state.future.length === 0) {
        return state;
      }

      return {
        past: [...state.past, state.present],
        present: state.future[0],
        future: state.future.slice(1),
      };
    });
});
