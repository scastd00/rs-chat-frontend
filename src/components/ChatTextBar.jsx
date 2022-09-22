import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  CssBaseline,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  IconButton,
  InputAdornment,
  Popover,
  TextField,
  Typography,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachmentIcon from '@mui/icons-material/Attachment';
import { useDropzone } from 'react-dropzone';
import { SUPPORTED_FILES } from '../utils/constants';
import EmojiService from '../services/EmojiService';
import { useStore } from 'react-redux';
import { EmojiEmotions } from '@mui/icons-material';

function ChatTextBar({ sendTextMessage, sendFiles }) {
  const userState = useStore().getState().user;

  const [anchorEl, setAnchorEl] = useState(null); // Only set once
  const [message, setMessage] = useState('');
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: true,
    accept: SUPPORTED_FILES,
  });
  const [dropzoneHover, setDropzoneHover] = useState('grey');
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadAttachmentDialog, setUploadAttachmentDialog] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [enableSendIcon, setEnableSendIcon] = useState(false);
  const [listOfEmojis, setListOfEmojis] = useState([]);
  const [selectingEmoji, setSelectingEmoji] = useState(false);

  useEffect(() => {
    setSelectedImages(acceptedFiles.map(file => file));
  }, [acceptedFiles]);

  useEffect(() => {
    // Enable send icon when message is not empty (or images are attached)
    setEnableSendIcon(message.trim().length > 0 || attachedFiles.length > 0);
  }, [message, attachedFiles]);

  function handleSendButton(evt) {
    evt.currentTarget
       .parentElement
       .parentElement
       .getElementsByTagName('input')[0]
      .focus({ preventScroll: true });

    performMessageSend(); // Outside the if statement to be able to send attachments without text
  }

  function handleKeyDown(evt) {
    if (!anchorEl) {
      setAnchorEl(evt.currentTarget); // First time to have it stored to display the list of emojis
    }

    if (evt.key === 'Enter') {
      performMessageSend();
    } else if (evt.key === ':') {
      EmojiService
        .getRandomEmojis(userState.tokens.accessToken)
        .then(res => {
          setListOfEmojis(res.data.emojis.map(getEmojiIconFromUnicode));
          setSelectingEmoji(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function getEmojiIconFromUnicode(emoji) {
    return {
      ...emoji,
      icon: emoji.unicode
                 .split(' ')
                 .map((u) => String.fromCodePoint(parseInt(u, 16)))
                 .join(''),
    };
  }

  function resetAllStates() {
    setMessage('');
    setAttachedFiles([]);
    setSelectedImages([]);
    setSelectingEmoji(false);
  }

  function performMessageSend() {
    // First send the text message if possible.
    if (message.trim().length !== 0) {
      sendTextMessage(message);
    }

    // Then send the attached files if possible.
    if (attachedFiles.length > 0) {
      sendFiles(attachedFiles);
    }

    resetAllStates();
  }

  function handleDropzoneCloseWithFileRemoval() {
    setUploadAttachmentDialog(false);
  }

  function handleAttachments() {
    setUploadAttachmentDialog(false);

    const promises = selectedImages.map(file =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = (ev) => {
          if (ev.loaded === ev.total) {
            resolve({
              name: file.name,
              type: file.type,
              data: reader.result,
            });
          }
        };

        reader.onerror = (err) => {
          reject(err);
        };

        // data:*/*;base64,<base64 encoded text>
        // The encoded text is taken in server
        reader.readAsDataURL(file);
      }));

    Promise
      .all(promises)
      .then(files => {
        setAttachedFiles(files);
        setTimeout(() => setSelectedImages([]), 200);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  function addEmojiToTextBox(evt) {
    const messageWithoutEmojiName = message.substring(0, message.lastIndexOf(':'));
    setMessage(messageWithoutEmojiName + evt.currentTarget.innerText + ' ');
    setSelectingEmoji(false);
    document.getElementById('TextBox').focus();
  }

  function handleTextChange(evt) {
    const evtValue = evt.target.value;
    setMessage(evtValue);

    if (selectingEmoji) {
      if (!evtValue.includes(':')) {
        setSelectingEmoji(false);
        return;
      }

      const emojiName = evtValue.split(':').pop() // Get the string from the ':' to the end of the string
                                .split(' ').shift(); // Get the first word (the one closer to ':')

      if (emojiName.length === 0) {
        return;
      }

      EmojiService
        .getEmojiContainsString(emojiName, userState.tokens.accessToken)
        .then(res => setListOfEmojis(res.data.emojis.map(getEmojiIconFromUnicode)))
        .catch(() => {
          setSelectingEmoji(false);
        });
    }
  }

  // Todo: when cancel or completed the emoji, the remaining text should remain intact. (With regex could be done, maybe)
  // Todo: list of emojis is not cleared to not produce visualization problems

  function handleCancelAddEmoji() {
    setSelectingEmoji(false);
    setMessage(message.substring(0, message.lastIndexOf(':')));
  }

  return (
    <>
      <CssBaseline />

      <Popover
        open={selectingEmoji}
        anchorEl={anchorEl}
        onFocusCapture={evt => evt.preventDefault()}
        disableEnforceFocus={true}
        disableAutoFocus={true}
        onClose={handleCancelAddEmoji}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Grid container direction='row' spacing={0.5}>
          {
            listOfEmojis.map(emoji => {
              return (
                <Grid item key={emoji.id}>
                  <IconButton onClick={addEmojiToTextBox}>
                    {emoji.icon}
                  </IconButton>
                </Grid>
              );
            })
          }
        </Grid>
      </Popover>

      <Grid container alignItems='center' justifyContent='center' spacing={1} sx={{ mt: 1 }}>
        <Grid item>
          <IconButton onClick={() => setSelectingEmoji(true)}>
            <EmojiEmotions />
          </IconButton>
        </Grid>

        <Grid item xs>
          <TextField
            fullWidth
            size='small'
            id='TextBox'
            label='Text'
            name='text'
            color='secondary'
            onKeyDown={handleKeyDown}
            onChange={handleTextChange}
            autoComplete='off'
            autoFocus
            value={message}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton onClick={() => setUploadAttachmentDialog(true)}>
                    <Badge badgeContent={attachedFiles.length} color='primary'>
                      <AttachmentIcon sx={{ transform: 'rotate(-45deg)' }} />
                    </Badge>
                  </IconButton>
                  <IconButton onClick={handleSendButton} disabled={!enableSendIcon}>
                    <SendIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>

      <Dialog open={uploadAttachmentDialog} onClose={() => setUploadAttachmentDialog(false)}>
        <DialogContent>
          <Grid container>
            <Grid item sx={{ p: 2 }}>
              <div
                {...getRootProps({ className: 'dropzone' })}
                style={{ border: `2px dashed ${dropzoneHover}` }}
                onMouseEnter={() => setDropzoneHover('blue')}
                onDragOver={() => setDropzoneHover('blue')}
                onMouseLeave={() => setDropzoneHover('grey')}
                onDragLeave={() => setDropzoneHover('grey')}
              >
                <input {...getInputProps()} type='file' accept='*' />

                <Typography sx={{ textAlign: 'center', p: 3 }}>
                  Drag 'n' drop files here, or click here to select them
                </Typography>
              </div>
              {
                selectedImages.length > 0 && (
                  <ul>
                    {
                      selectedImages.map((imageFile) => {
                        return <li key={imageFile.name}>{imageFile.name}</li>;
                      })
                    }
                  </ul>
                )
              }
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button color='error' onClick={handleDropzoneCloseWithFileRemoval}>Cancel</Button>
          <Button color='success' onClick={handleAttachments}>Attach</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ChatTextBar;
