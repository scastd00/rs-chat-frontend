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

function ChatTextBar({ sendTextMessage, sendFiles }) {
  const userState = useStore().getState().user;

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
    if (evt.key === 'Enter') {
      performMessageSend();
    } else if (evt.key === ':') {
      EmojiService
        .getRandomEmojis(userState.tokens.accessToken)
        .then(res => {
          setListOfEmojis(res.data.emojis.map(getEmojiIconFromUnicode));
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

  function performMessageSend() {
    // First send the text message if possible.
    if (message.trim().length !== 0) {
      sendTextMessage(message);
    }

    // Then send the attached files if possible.
    if (attachedFiles.length > 0) {
      sendFiles(attachedFiles);
    }

    setMessage('');
    setAttachedFiles([]);
    setSelectedImages([]);
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
    setMessage(message + evt.currentTarget.innerText);
  }

  return (
    <>
      <CssBaseline />

      <TextField
        margin='normal'
        fullWidth
        size='small'
        id='Text'
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

      <Grid container spacing={1}>
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
