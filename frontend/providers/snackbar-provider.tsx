// components/SnackbarProvider.tsx
'use client';
import React, { createContext, useState, useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import { duration } from '@mui/material';
import { Spinner } from '@nextui-org/react';
import { ErrorIcon, InfoIcon, SucessIcon } from '../constants/SnackBarIcons';

interface SnackbarContextType {
  openSnackbar: (
    message: string,
    severity: 'success' | 'error' | 'info' | 'loading'
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    'success' | 'error' | 'info' | 'loading'
  >('info');
  const [action, setAction] = useState<React.ReactNode | undefined>(undefined);

  const openSnackbar = (
    message: string,
    severity: 'success' | 'error' | 'info' | 'loading'
  ) => {
    setSnackbarOpen(true);
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);

    switch (severity) {
      case 'success':
        setAction(<SucessIcon />);
        break;

      case 'error':
        setAction(<ErrorIcon />);
        break;

      case 'info':
        setAction(<InfoIcon />);
        break;

      case 'loading':
        setAction(<Spinner size="md" />);
        break;

      default:
    }

    const duration = 6000;

    if (severity !== 'loading') {
      setTimeout(() => {
        setSnackbarOpen(false);
      }, duration); // Close after duration if not loading
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar }}>
      {children}
      <Snackbar
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Position at top center
        action={snackbarSeverity === 'loading' && <Spinner size="md" />}
        style={{ backgroundColor: 'white', color: 'black' }}
      />
      {snackbarSeverity === 'loading' && <Spinner size="md" />}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};
