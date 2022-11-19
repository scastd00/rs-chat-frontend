import { createReducer } from '@reduxjs/toolkit';
import { goBackChat, goForwardChat, setChatKey } from '../actions';
import undoable from 'redux-undo';

const initialState = {
  past: [],
  present: '',
  future: [],
};

const chatReducer = createReducer(initialState, builder => {
  builder
    .addCase(setChatKey, (state, action) => {
      // Add the new chat key to the present
      // if (state.present === action.payload) {
      //   return state;
      // }

      return {
        past: [...state.past, state.present],
        present: action.payload,
        future: [],
      };
    })
    .addCase(goBackChat, state => {
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
    .addCase(goForwardChat, state => {
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

const undoableChatReducer = undoable(chatReducer, {
  limit: 15,
});

export default undoableChatReducer;
