import React from 'react';
import { useParams } from 'react-router-dom';

function AdministerGroup(props) {
  const { id } = useParams();

  return (
    <>{id}</>
  );
}

export default AdministerGroup;
