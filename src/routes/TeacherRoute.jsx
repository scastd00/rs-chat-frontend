import React from 'react';
import { isLoggedIn, isTeacher } from './utils';
import { Navigate } from 'react-router';

/**
 * If the user is logged in and is a teacher, render the component.
 * Otherwise, redirect to the login page.
 *
 * @param Component The component to render if the user is logged in.
 * @returns {JSX.Element} - The resulting component of checking if the user is logged in.
 */
export default function TeacherRoute({ component: Component }) {
  if (isLoggedIn()) {
    if (!isTeacher()) {
      return <Navigate to='/error' />;
    }

    return <Component />;
  }

  return <Navigate to='/login' />;
}
