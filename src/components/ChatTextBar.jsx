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
import EmojiSelector from './EmojiSelector';
import { getEmojiFromUnicode } from '../utils';

function ChatTextBar({ sendTextMessage, sendFiles }) {
  const userState = useStore().getState().user;

  const [anchorEl, setAnchorEl] = useState(null); // Only set once
  const [message, setMessage] = useState('');
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: true,
    accept: SUPPORTED_FILES,
  });
  const [dropzoneHover, setDropzoneHover] = useState('grey');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadAttachmentDialog, setUploadAttachmentDialog] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState([]);
  const [enableSendIcon, setEnableSendIcon] = useState(false);
  const [listOfEmojis, setListOfEmojis] = useState([]);
  const [selectingEmoji, setSelectingEmoji] = useState(false);

  useEffect(() => {
    setSelectedFiles(acceptedFiles.map(file => file));
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
    if (evt.key === 'Enter') {
      performMessageSend();
    }
  }

  function getEmojiIconFromUnicode(emoji) {
    return {
      ...emoji,
      icon: getEmojiFromUnicode(emoji.unicode),
    };
  }

  function resetAllStates() {
    setMessage('');
    setAttachedFiles([]);
    setSelectedFiles([]);
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

  function closeDropzone() {
    setUploadAttachmentDialog(false);
  }

  function attachFiles() {
    setUploadAttachmentDialog(false);

    const promises = selectedFiles.map(file =>
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
        setTimeout(() => setSelectedFiles([]), 200); // To prevent showing the hide animation
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  function addEmojiToTextBox(evt) {
    setMessage(message + evt.currentTarget.innerText + ' ');
    // Todo: set the emoji in next to the cursor position
    document.getElementById('TextBox').focus();
  }

  // Todo: when cancel or completed the emoji, the remaining text should remain intact. (With regex could be done, maybe)
  // Todo: list of emojis is not cleared to not produce visualization problems

  function showEmojisFromButton(evt) {
    setAnchorEl(evt.currentTarget);

    EmojiService
      .getRandomEmojis(10, userState.token)
      .then(res => {
        setListOfEmojis(res.data.emojis.map(getEmojiIconFromUnicode));
        setSelectingEmoji(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <CssBaseline />

      <EmojiSelector
        anchorEl={anchorEl}
        onClose={() => setSelectingEmoji(false)}
        open={selectingEmoji}
        listOfEmojis={listOfEmojis}
        addEmojiToTextBox={addEmojiToTextBox}
      />

      <Grid container alignItems='center' justifyContent='center' spacing={1} sx={{ mt: 1 }}>
        <Grid item>
          <IconButton onClick={showEmojisFromButton}>
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
            onChange={(evt) => setMessage(evt.target.value)}
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
                selectedFiles.length > 0 && (
                  <ul>
                    {
                      selectedFiles.map(file => {
                        return <li key={file.name}>{file.name}</li>;
                      })
                    }
                  </ul>
                )
              }
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button color='error' onClick={closeDropzone}>Cancel</Button>
          <Button color='success' onClick={attachFiles}>Attach</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default ChatTextBar;
