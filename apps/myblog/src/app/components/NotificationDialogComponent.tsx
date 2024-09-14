import React, { useState } from 'react';
import { Dialog, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

const NotificationDialog: React.FC = () => {
  const [open, setOpen] = useState(false);

  // Function to handle the opening of the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to handle the closing of the dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {/* Button to trigger the opening of the notification dialog */}
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Show Notification
      </Button>

      {/* Notification Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Save status</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Article Saved
          </DialogContentText>
        </DialogContent>
        {/* Simple close button inside dialog */}
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </Dialog>
    </div>
  );
};

export default NotificationDialog;
