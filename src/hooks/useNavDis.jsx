import React from 'react';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';

export function useNavDis() {
  return [useNavigate(), useDispatch()];
}
