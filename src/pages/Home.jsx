import React, { useEffect, useState } from 'react';
import { Button, Container, CssBaseline, Grid, Link, Typography } from '@mui/material';
import ChatService from '../services/ChatService';
import { useDispatch, useStore } from 'react-redux';
import { checkResponse } from '../utils';
import { useNavigate } from 'react-router';
import DropDown from '../components/DropDown';

function Home() {
  const [allChats, setAllChats] = useState({});
  const userState = useStore().getState().user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    ChatService
      .getAllChatsOfUser(userState.user.username, userState.tokens.accessToken)
      .then((res) => {
        setAllChats(res.data.chats);
      })
      .catch((err) => {
        checkResponse(err, navigate, dispatch);
      });
  }, []);

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
