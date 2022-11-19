import { combineReducers } from '@reduxjs/toolkit';
import { themeReducer } from './themeReducer';
import { userReducer } from './userReducer';
import { historyReducer } from './historyReducer';

const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  history: historyReducer,
});

export default rootReducer;
