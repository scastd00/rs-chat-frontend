import React from 'react';
import { useParams } from 'react-router-dom';

function AdministerDegree(props) {
  const { id } = useParams();

  return (
    <>{id}</>
  );
}

export default AdministerDegree;
