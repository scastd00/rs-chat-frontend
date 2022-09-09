import React from 'react';
import { useParams } from 'react-router-dom';

function AdministerSubject(props) {
  const { id } = useParams();

  return (
    <>{id}</>
  );
}

export default AdministerSubject;
