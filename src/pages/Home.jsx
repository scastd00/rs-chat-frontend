import React from 'react';
import { Button, Container, CssBaseline, Grid, Link, Typography } from '@mui/material';
import { useStore } from 'react-redux';
import { useNavigate } from 'react-router';
import DropDown from '../components/DropDown';
import { capitalizeFirstLetter } from '../utils';
import ChatService from '../services/ChatService';

function Home() {
  const userState = useStore().getState().user;
  const navigate = useNavigate();

  function connectToChatIfPossible(chatType, chatId) {
    ChatService
      .userCanConnect(chatId, userState.user.id, userState.tokens.accessToken)
      .then((res) => {
        if (res.data.canConnect) {
          navigate(`/chat/${chatType}-${chatId}`);
        } else {
          // Todo: display a popup
        }
      })
      .catch((err) => console.error("Error: ", err));
  }

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
                  {/* 4 columns -> 12 places : 3 places/column = 4 */}
                  <Grid container spacing={0} sx={{ p: 0.5 }} columns={12}>
                    {
                      chatList.map(({ name, id: chatId }, idx2) => {
                        return (
                          <Grid item container key={idx2} xs={3} sx={{ p: 1 }} justifyContent='center'>
                            <Link style={{ display: 'block' }} underline='none'>
                              <Button
                                variant='outlined'
                                disableElevation
                                color='secondary'
                                onClick={() => connectToChatIfPossible(chatType, chatId)}
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
