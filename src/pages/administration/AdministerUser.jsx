import React from 'react';
import { useParams } from 'react-router-dom';

function AdministerUser(props) {
  const { id } = useParams();

  return (
    <>{id}</>
  );
}

export default AdministerUser;
