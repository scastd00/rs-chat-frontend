import React, { useState } from 'react';
import { Button, Container, CssBaseline, Grid, Link, Typography } from '@mui/material';
import { useStore } from 'react-redux';
import { useNavigate } from 'react-router';
import DropDown from '../components/DropDown';

function Home() {
  const userState = useStore().getState().user;
  const [allChats] = useState(userState.chats);
  const navigate = useNavigate();

  return (
    <Container sx={{ my: 2 }}>
      <CssBaseline />

      <Grid container direction='column'>
        <Grid item>
          <Typography variant='h4'>
            Your chats
          </Typography>
        </Grid>

        <Grid item>
          {
            Object.entries(allChats).map(([chatType, chatList], idx) => {
              return (
                <DropDown title={chatType.toUpperCase()} key={idx}>
                  <Grid container spacing={2}>
                    {
                      chatList.map(({ name, id: chatId }, idx2) => {
                        return (
                          <Grid item key={idx2}>
                            <Link style={{ display: 'block' }} underline='none'>
                              <Button
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
                </DropDown>
              );
            })
          }
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
