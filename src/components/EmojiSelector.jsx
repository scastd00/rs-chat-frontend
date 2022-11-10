import React, { useEffect, useState } from 'react';
import { Box, Grid, IconButton, Popover, Tab, Tabs, tabsClasses, Tooltip } from '@mui/material';
import EmojiService from '../services/EmojiService';
import { checkResponse, getEmojiFromUnicode } from '../utils';
import { useNavDis } from '../hooks/useNavDis';
import { useStore } from 'react-redux';

function EmojiSelector({ anchorEl, open, onClose, addEmojiToTextBox }) {
  const categories = [
    'Smileys & Emotion',
    'Component',
    'People & Body',
    'Travel & Places',
    'Objects',
    'Smileys & People',
    'Animals & Nature',
    'Food & Drink',
    'Activities',
    'Symbols',
    'Flags',
  ];

  const userState = useStore().getState().user;
  const [navigate, dispatch] = useNavDis();
  const [tabPosition, setTabPosition] = useState(0);
  const [currentEmojis, setCurrentEmojis] = useState({
    category: categories[tabPosition],
    emojis: [],
  });
  const [allEmojisByCategory, setAllEmojisByCategory] = useState(
    Object.assign(...categories.map(k => ({ [k]: [] }))), // Default to empty array for each category to be able to load the page
  );

  const handleChange = (event, newValue) => {
    setTabPosition(newValue);
  };

  useEffect(() => {
    EmojiService
      .getEmojisGroupedByCategory(userState.token)
      .then(res => {
        setAllEmojisByCategory(res.data.emojis);
        setCurrentEmojis({
          category: categories[tabPosition],
          emojis: res.data.emojis[categories[tabPosition]],
        });
      })
      .catch(err => checkResponse(err, navigate, dispatch));
  }, []);

  useEffect(() => {
    setCurrentEmojis({
      category: categories[tabPosition],
      emojis: allEmojisByCategory[categories[tabPosition]],
    });
  }, [tabPosition]);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onFocusCapture={evt => evt.preventDefault()}
      disableEnforceFocus={true}
      disableAutoFocus={true}
      onClose={() => onClose()}
      sx={{ mt: -1 }}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Box
        sx={{
          maxWidth: { xs: 300, sm: 450 },
          height: 250,
          // backgroundColor: 'background.paper',
        }}
      >
        <Tabs
          value={tabPosition}
          onChange={handleChange}
          indicatorColor='primary'
          textColor='primary'
          variant='scrollable'
          scrollButtons='auto'
          aria-label='scrollable auto tabs emojis'
          sx={{
            [`& .${tabsClasses.scrollButtons}`]: {
              '&.Mui-disabled': { opacity: 0.3 },
            },
          }}
        >
          {
            categories.map((category, index) => (
              <Tab label={category} key={index} />
            ))
          }
        </Tabs>

        <Grid container direction='row' spacing={0.5}>
          {
            currentEmojis.emojis.map(emoji => {
              return (
                <Grid item key={emoji.id}>
                  <Tooltip title={emoji.name}>
                    <IconButton onClick={addEmojiToTextBox}>
                      {getEmojiFromUnicode(emoji.unicode)}
                    </IconButton>
                  </Tooltip>
                </Grid>
              );
            })
          }
        </Grid>
      </Box>
    </Popover>
  );
}

export default EmojiSelector;
