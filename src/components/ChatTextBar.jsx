import React, { useEffect, useState } from 'react';
import {
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

function ChatTextBar({ sendTextMessage, sendImageMessage }) {
  const [message, setMessage] = useState('');
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: true,
    // accept: SUPPORTED_FILES,
  });
  const [dropzoneHover, setDropzoneHover] = useState('grey');
  // const [filesError, setFilesError] = useState({ show: false, text: 'Hola' });
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploadAttachmentDialog, setUploadAttachmentDialog] = useState(false);

  useEffect(() => {
    setSelectedImages(acceptedFiles.map((file) => file));
  }, [acceptedFiles]);

  function handleSendButton(evt) {
    if (message !== '') {
      evt.currentTarget
         .parentElement
         .parentElement
         .getElementsByTagName('input')[0]
        .focus({ preventScroll: true });

      performMessageSend();
    }
  }

  function handleSendEnter(evt) {
    if (evt.code === 'Enter' && message.trim().length !== 0) {
      performMessageSend();
    }
  }

  function performMessageSend() {
    setMessage('');
    sendTextMessage(message);
  }

  function handleDropzoneCloseWithFileRemoval() {
    setUploadAttachmentDialog(false);
    setTimeout(() => setSelectedImages([]), 200);
  }

  function handleAttachments() {
    setUploadAttachmentDialog(false);

    const promises = selectedImages.map(file =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (ev) => {
          const base64Content = reader.result.split(',')[1];

          if (ev.loaded === ev.total) {
            console.log('% loaded', (ev.loaded / ev.total) * 100);
            resolve({
              name: file.name,
              type: file.type,
              data: base64Content,
            });
          }
        };

        reader.onerror = (err) => {
          reject(err);
        };

        reader.readAsDataURL(file);
      }));

    Promise
      .all(promises)
      .then((d) => {
        sendImageMessage(d);
        setTimeout(() => setSelectedImages([]), 200);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }

  return (
    <>
      <CssBaseline />
      <TextField
        margin='normal'
        size='small'
        fullWidth
        id='Text'
        label='Text'
        name='text'
        color='secondary'
        onKeyDown={handleSendEnter}
        onChange={(evt) => setMessage(evt.target.value)}
        autoFocus
        value={message}
        InputProps={{
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={() => setUploadAttachmentDialog(true)}>
                <AttachmentIcon sx={{ transform: 'rotate(-45deg)' }} />
              </IconButton>
              <IconButton onClick={handleSendButton}>
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

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
                <input {...getInputProps()} type='file' accept='image/*' />

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
