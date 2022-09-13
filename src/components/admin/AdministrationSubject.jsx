import React from 'react';
import DropDown from '../DropDown';
import { Grid } from '@mui/material';
import { useClipboard } from '../../hooks/useClipboard';
import Link from '@mui/material/Link';

function AdministrationSubject(props) {
  const [copyToClipboard] = useClipboard();

  return (
    <DropDown title='Subjects' button={props.button}>
      {
        props.allSubjects.map(sub => (
          React.cloneElement(
            <Grid item key={sub.id}>
              <Link
                sx={{ cursor: 'pointer', color: 'text.primary' }}
                underline='hover'
                onClick={() => copyToClipboard(sub.invitationCode)}
              >
                {sub.name}
              </Link>
            </Grid>,
          )
        ))
      }
    </DropDown>
  );
}

export default AdministrationSubject;
