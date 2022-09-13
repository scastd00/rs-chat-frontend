import React from 'react';
import DropDown from '../DropDown';

function AdministrationUser(props) {
  return (
    <DropDown title='Users' button={props.button}>
    </DropDown>
  );
}

export default AdministrationUser;
