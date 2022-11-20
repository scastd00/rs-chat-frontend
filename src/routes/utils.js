import { useStore } from 'react-redux';

export const isLoggedIn = () => {
  const state = useStore().getState();
  const user = state.user.user;

  return user.username !== undefined;
};

export const isTeacher = () => {
  const state = useStore().getState();
  const user = state.user.user;

  return user.role === 'TEACHER';
};

export const isAdmin = () => {
  const state = useStore().getState();
  const user = state.user.user;

  return user.role === 'ADMINISTRATOR';
};
