import React, { useEffect, useState } from 'react';
import { AppBar, Button, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { connect, useDispatch, useStore } from 'react-redux';
import { changeTheme } from '../actions';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import DarkModeTwoToneIcon from '@mui/icons-material/DarkModeTwoTone';
import LoginTwoToneIcon from '@mui/icons-material/LoginTwoTone';
import LogoutTwoToneIcon from '@mui/icons-material/LogoutTwoTone';
import HowToRegTwoToneIcon from '@mui/icons-material/HowToRegTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import LightModeTwoToneIcon from '@mui/icons-material/LightModeTwoTone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SupervisorAccountTwoToneIcon from '@mui/icons-material/SupervisorAccountTwoTone';

function ToolBar(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const state = useStore().getState();
  const userState = props.data;

  const [darkMode, setDarkMode] = useState(state.theme.isDarkTheme);

  useEffect(() => {
    setDarkMode(state.theme.isDarkTheme);
  }, [state.theme]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (!!props.data.user.username) {
      // If username is defined
      setLoggedIn(true);
      setUsername(props.data.user.username);
    } else {
      setLoggedIn(false);
      setUsername('');
    }
  }, [props.data.user]);

  return (
    <AppBar position='relative'>
      <Toolbar>
        <Grid container direction='row' justifyContent='space-between' alignItems='center'>
          <Grid item>
            <Grid container spacing={2}>
              <Grid item>
                <Button variant='text' disabled={!loggedIn} color='secondary' onClick={() => navigate('/home')}>
                  <HomeTwoToneIcon sx={{ mr: 1 }} fontSize='medium' />
                  Home
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Button variant='text' color='secondary' onClick={handleClick}>
              <AccountCircleIcon fontSize='large' />
              {
                // If the user is logged in, show the username
                loggedIn && (
                  <Typography variant='text' color='secondary' fontSize='medium' sx={{ pl: 1, textTransform: 'none' }}>
                    {username}
                  </Typography>
                )
              }
            </Button>

            <IconButton variant='text' color='secondary' onClick={() => dispatch(changeTheme())}>
              {darkMode ? <LightModeTwoToneIcon fontSize='large' /> : <DarkModeTwoToneIcon fontSize='large' />}
            </IconButton>

            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              {loggedIn ? (
                <div>
                  {userState.user.role === 'ADMINISTRATOR' ? (
                    <MenuItem
                      onClick={() => {
                        setAnchorEl(null);
                        navigate('/administration');
                      }}
                    >
                      <AccountCircleTwoToneIcon sx={{ mr: 1 }} />
                      Administration
                    </MenuItem>
                  ) : (
                    ''
                  )}
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      navigate('/profile');
                    }}
                  >
                    <SupervisorAccountTwoToneIcon sx={{ mr: 1 }} />
                    View Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      navigate('/logout');
                    }}
                  >
                    <LogoutTwoToneIcon sx={{ mr: 1 }} />
                    LogOut
                  </MenuItem>
                </div>
              ) : (
                <div>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      navigate('/login');
                    }}
                  >
                    <LoginTwoToneIcon sx={{ mr: 1 }} />
                    LogIn
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      setAnchorEl(null);
                      navigate('/register');
                    }}
                  >
                    <HowToRegTwoToneIcon sx={{ mr: 1 }} />
                    Register
                  </MenuItem>
                </div>
              )}
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.user,
  };
};

export default connect(mapStateToProps)(ToolBar);
