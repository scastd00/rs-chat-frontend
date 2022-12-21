import React from 'react';
import { Grid, Typography, useTheme } from '@mui/material';
import { useStore } from 'react-redux';

function TextChatCard({ text, customColor }) {
  const userState = useStore().getState().user;
  const theme = useTheme();

  function isCurrentUsername(username) {
    return username === userState.user.username;
  }

  const displayMessage = (textToMark) => {
    // console.log(textToMark);
    // if (textToMark.includes('##')) {
    //   return textToMark.body.content.split('##').map((text, index) => (
    //     <React.Fragment key={index}>
    //       {text}
    //       <br />
    //     </React.Fragment>
    //   ));
    // }

    return textToMark.split(' ').map((word, idx) => {
      if (word.startsWith('@')) {
        // Split word into three parts: @ (ignored), username (word), symbols
        const [, username, ...symbols] = word.split(/(\w+)/);

        return (
          <span key={idx}>
            <span style={{
              color: isCurrentUsername(username) ? theme.palette.mention.self : theme.palette.mention.other,
              fontStyle: 'italic',
            }}>
              @{username}
            </span>
            <span>{symbols}&nbsp;</span>
          </span>
        );
      }

      return word + ' ';
    });
  };

  return (
    <Grid container>
      <Grid item xs zeroMinWidth>
        <Typography
          style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}
          sx={customColor ? { color: customColor } : {}}
        >
          {displayMessage(text)}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default TextChatCard;
