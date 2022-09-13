import React from 'react';
import DropDown from '../DropDown';
import { Grid } from '@mui/material';
import { useClipboard } from '../../hooks/useClipboard';
import Link from '@mui/material/Link';

function AdministrationGroup(props) {
  const [copyToClipboard] = useClipboard();

  return (
    <DropDown title='Groups' button={props.button}>
      {
        props.allGroups.map(group => (
          React.cloneElement(
            <Grid item key={group.id}>
              <Link
                sx={{ cursor: 'pointer', color: 'text.primary' }}
                underline='hover'
                onClick={() => copyToClipboard(group.invitationCode)}
              >
                {group.name}
              </Link>
            </Grid>,
          )
        ))
      }
    </DropDown>
  );
}

export default AdministrationGroup;
