import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addHistory } from '../actions';

export function useNavDis() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navigateFn = (path) => {
    const split = path.split('#');
    navigate(split[0]); // Navigate to the path (first part of the string)
    dispatch(addHistory(path)); // Add the path to the history (complete string)
  };

  return [navigateFn, dispatch];
}
