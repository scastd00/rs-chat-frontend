import { combineReducers } from '@reduxjs/toolkit';
import { themeReducer } from './themeReducer';
import { userReducer } from './userReducer';
import chatReducer from './chatReducer';

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  chat: chatReducer,
});

export default rootReducer;
