import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addHistory } from '../actions';

export function useNavDis() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateFn = (path) => {
    navigate(path);
    dispatch(addHistory(path));
  };

  return [navigateFn, dispatch];
}
