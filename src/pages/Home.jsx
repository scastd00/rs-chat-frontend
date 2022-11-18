import React, { useEffect, useState } from 'react';
import { Button, Container, CssBaseline, Grid, Link, Typography } from '@mui/material';
import { useStore } from 'react-redux';
import DropDown from '../components/DropDown';
import { capitalizeFirstLetter, checkResponse } from '../utils';
import ChatService from '../services/ChatService';
import { setAvailableChats } from '../actions';
import { useNavDis } from '../hooks/useNavDis';

function Home() {
  const userState = useStore().getState().user;
  const [navigate, dispatch] = useNavDis();
  const [chats, setChats] = useState({});

  useEffect(() => {
    ChatService
      .getAllChatsOfUser(userState.user.username, userState.token)
      .then(chatsRes => {
        setChats(chatsRes.data.chats);
        dispatch(setAvailableChats(chatsRes.data.chats));
      })
      .catch(err => {
        checkResponse(err, navigate, dispatch);
      });
  }, []);

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
            Object.entries(chats).map(([chatType, chatList], idx) => {
              return React.cloneElement(
                <DropDown title={capitalizeFirstLetter(chatType)} key={idx} drop={chatType === 'group'}>
                  {/* 4 columns -> 12 places : 3 places/column = 4 */}
                  <Grid container spacing={0}>
                    {
                      chatList.map(({ name, key }, idx2) => {
                        return (
                          <Grid item container xs={12} md={4} xl={2} key={idx2} sx={{ p: 1 }} justifyContent='center'>
                            <Link style={{ display: 'block' }} underline='none'>
                              <Button
                                variant='contained'
                                disableElevation
                                color='secondary'
                                onClick={() => navigate(`/chat/${key}`)}
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
