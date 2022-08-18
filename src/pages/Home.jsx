import React from 'react';
import { Button, Container, CssBaseline, Grid, Link, Typography } from '@mui/material';
import { useStore } from 'react-redux';
import { useNavigate } from 'react-router';
import DropDown from '../components/DropDown';
import { capitalizeFirstLetter } from '../utils';

function Home() {
  const userState = useStore().getState().user;
  const navigate = useNavigate();

  return (
    <Container sx={{ my: 2 }}>
      <CssBaseline />

      <Grid container direction='column' spacing={2}>
        <Grid item>
          <Typography variant='h3'>
            Your chats
          </Typography>

          <Typography variant='body2' color='info.main' pt={0.5}>
            Info: click the button of the chat you want to join
          </Typography>
        </Grid>

        <Grid item>
          {
            Object.entries(userState.chats).map(([chatType, chatList], idx) => {
              return React.cloneElement(
                <DropDown title={capitalizeFirstLetter(chatType)} key={idx} drop={chatType === 'group'}>
                  <Grid container sx={{ pt: 2 }}>
                    {
                      chatList.map(({ name, id: chatId }, idx2) => {
                        return (
                          <Grid item key={idx2}>
                            <Link style={{ display: 'block' }} underline='none'>
                              <Button
                                variant='outlined'
                                disableElevation
                                color='secondary'
                                onClick={() => navigate(`/chat/${chatType}-${chatId}`)}
                              >
                                {name}
                              </Button>
                            </Link>
                          </Grid>
                        );
                      })
                    }
                  </Grid>
                </DropDown>,
              );
            })
          }
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
