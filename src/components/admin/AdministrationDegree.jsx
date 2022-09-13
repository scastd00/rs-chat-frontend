import React from 'react';
import DropDown from '../DropDown';
import { Grid } from '@mui/material';
import { useClipboard } from '../../hooks/useClipboard';
import Link from '@mui/material/Link';

function AdministrationDegree(props) {
  const [copyToClipboard] = useClipboard();

  return (
    <DropDown title='Degrees' button={props.button}>
      {
        props.allDegrees.map(deg => (
          React.cloneElement(
            <Grid item key={deg.id}>
              <Link
                sx={{ cursor: 'pointer', color: 'text.primary' }}
                underline='hover'
                onClick={() => copyToClipboard(deg.invitationCode)}
              >
                {deg.name}
              </Link>
            </Grid>,
          )
        ))
      }
    </DropDown>
  );
}

export default AdministrationDegree;
