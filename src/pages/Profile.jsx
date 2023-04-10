import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  CssBaseline,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useStore } from 'react-redux';
import UserService from '../services/UserService';
import { checkResponse, dateTime } from '../utils';
import DropDown from '../components/DropDown';
import SnackAlert from '../components/SnackAlert';
import AuthService from '../services/AuthService';
import ChatService from '../services/ChatService';
import { setAvailableChats } from '../actions';
import { useNavDis } from '../hooks/useNavDis';
import BadgeService from '../services/BadgeService';
import BadgeItem from '../components/BadgeItem';

function Profile() {
  const [navigate, dispatch] = useNavDis();

  const userState = useStore().getState().user;
  const dividerSx = { my: 2, opacity: 1 };

  const [sessions, setSessions] = useState([]);
  const [badges, setBadges] = useState([]);
  const [stats, setStats] = useState([]);
  const [chatCode, setChatCode] = useState('');
  const [joinAlert, setJoinAlert] = useState({ open: false, type: 'success', message: '' });

  useEffect(() => {
    UserService
      .openedSessions(userState.user.username, userState.token)
      .then((res) => {
        setSessions(res.data);
      })
      .catch((err) => {
        checkResponse(err, navigate, dispatch);
      });

    BadgeService
      .getBadges(userState.user.id, userState.token)
      .then(res => {
        setBadges(res.data);
      })
      .catch(err => {
        checkResponse(err, navigate, dispatch);
      });

    UserService
      .getStats(userState.user.username, userState.token)
      .then(res => {
        setStats(res.data);
      })
      .catch(err => {
        checkResponse(err, navigate, dispatch);
      });
  }, []);

  function handleResetPassword() {
    AuthService
      .forgotPassword(userState.user.email)
      .then(() => {
        navigate('/createPassword');
      })
      .catch(e => {
        console.log('Error in forgot password', e.response.data);
      });
  }

  function handleJoinChat() {
    UserService
      .joinToChat(userState.user.id, chatCode, userState.token)
      .then(res => {
        setChatCode('');
        showInvitationCodeAlert('success', 'Joined to chat ' + res.data);

        ChatService
          .getAllChatsOfUser(userState.user.username, userState.token)
          .then(chatsRes => {
            dispatch(setAvailableChats(chatsRes.data));
          })
          .catch(err => {
            console.error(err);
          });
      })
      .catch(err => {
        setChatCode('');
        showInvitationCodeAlert('error', err.response.data);
      });
  }

  // Executed in this order to avoid the alert from closing strangely
  function showInvitationCodeAlert(type, message) {
    setJoinAlert({ open: true, type, message });

    setTimeout(() => {
      setJoinAlert({ open: false, type, message }); // Close the alert
    }, 2500);
  }

  function statsFullDropdownContent(entry) {
    function val(name, value, depth) {
      if (typeof value === 'object') {
        return (
          <React.Fragment key={value}>
            <ListItem sx={{ height: 30, pl: 6 + (4 * depth) }}>
              <ListItemIcon sx={{ mr: -2 }}>
                <ArrowRightIcon />
              </ListItemIcon>

              <ListItemText primary={name} />
            </ListItem>

            <List>
              {
                Object.entries(value).map(([n1, v1]) => {
                  return val(n1, v1, depth + 1);
                })
              }
            </List>
          </React.Fragment>
        );
      } else {
        return (
          // The padding depends on the depth of the object
          <ListItem key={name} sx={{ height: 30, pl: 6 + (4 * depth) }}>
            <ListItemIcon sx={{ mr: -2 }}>
              <ArrowRightIcon />
            </ListItemIcon>

            <ListItemText>
              {name}: {value}
            </ListItemText>
          </ListItem>
        );
      }
    }

    const [name, value] = entry;
    return val(name, value, 0);
  }

  return (
    <Container sx={{ my: 2 }}>
      <CssBaseline />

      <Grid container direction="column">
        <Grid item>
          <Typography variant="h3">My profile</Typography>
        </Grid>

        <Divider sx={dividerSx} />

        <Grid item container direction="row" alignItems="center" justifyContent="space-between" spacing={1.5}>
          <Grid item>
            <Grid container direction="column">
              <Grid item>
                <Typography sx={{ fontSize: 18 }}>
                  Username: {userState.user.username} ({userState.user.role})
                </Typography>
              </Grid>

              <Grid item>
                <Typography sx={{ fontSize: 18 }}>
                  Full name: {userState.user.fullName}
                </Typography>
              </Grid>

              <Grid item>
                <Typography sx={{ fontSize: 18 }}>
                  Email: {userState.user.email}
                </Typography>
              </Grid>

              <Grid item>
                <Typography sx={{ fontSize: 18 }}>
                  Password: *****
                  <Button
                    size="small"
                    sx={{ ml: 2 }}
                    onClick={handleResetPassword}
                  >
                    Change
                  </Button>
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid container direction="column" spacing={0.5}>
              <Grid item>
                <Typography>
                  Join a chat
                </Typography>
              </Grid>

              <Grid item>
                <TextField
                  size="small"
                  margin="dense"
                  id="chatCode"
                  label="Chat code"
                  name="chatCode"
                  value={chatCode}
                  onChange={(e) => setChatCode(e.target.value)}
                />
              </Grid>

              <Grid item>
                <Button onClick={handleJoinChat} disabled={chatCode.trim().length === 0}>
                  Unlock chat
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={dividerSx} />

        <DropDown title="Opened sessions">
          <List>
            {
              sessions.map(session => (
                React.cloneElement(
                  <ListItem key={session.id} sx={{ height: 30, ml: 6 }}>
                    <ListItemIcon sx={{ mr: -2 }}>
                      <ArrowRightIcon />
                    </ListItemIcon>

                    <ListItemText>
                      {session.srcIp} (session ends {dateTime(session.endDate)})
                    </ListItemText>
                  </ListItem>,
                )
              ))
            }
          </List>
        </DropDown>

        <Divider sx={dividerSx} />

        <DropDown title="Stats">
          <List>
            {
              Object.entries(stats).map(statsFullDropdownContent)
            }
          </List>
        </DropDown>

        <Divider sx={dividerSx} />

        <DropDown title="Badges">
          <Grid container direction="row" spacing={5} sx={{ pt: 2 }}>
            {
              badges.map(badge => (
                <Grid item key={badge.id} xs={2}>
                  <BadgeItem title={badge.title} description={badge.description} icon={badge.icon} />
                </Grid>
              ))
            }
          </Grid>
        </DropDown>

        <SnackAlert open={joinAlert.open} severity={joinAlert.type}>
          <Typography>{joinAlert.message}</Typography>
        </SnackAlert>
      </Grid>
    </Container>
  );
}

export default Profile;
