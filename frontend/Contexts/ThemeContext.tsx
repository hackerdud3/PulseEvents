'use client';
import { createTheme } from '@mui/material';
import React, { useContext } from 'react';

export const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: 'black'
        }
      }
    }
  }
});
