import React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';

const Pill = () => (
  <div
    style={{
      width: '56px',
      height: '24px',
      backgroundColor: '#e0e0e0',
      borderRadius: '20px',
    }}
  />
);

const Square = () => (
  <div
    style={{
      width: '1em',
      height: '1em',
      fontSize: '40px',
      backgroundColor: '#e0e0e0',
      borderRadius: '4px',
      flexShrink: 0,
    }}
  />
);

const HeaderRooted = ({ trigger, sx, ...props }) => (
  <Box
    {...props}
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: {
        xs: 'space-between',
        sm: 'flex-start',
      },
      gap: 2,
      px: 2,
      flex: 1,
      ...sx,
    }}
  >
    {trigger}
    <Square />
    <Box
      ml="auto"
      sx={{
        display: {
          xs: 'none',
          sm: 'flex',
        },
        alignItems: 'center',
        gap: {
          xs: 2,
          md: 3,
        },
      }}
    >
      <Pill />
      <Pill />
      <Pill />
      <Pill />
    </Box>
    <Avatar
      sx={{
        width: 32,
        height: 32,
        ml: {
          xs: 0,
          sm: 2,
        },
      }}
    />
  </Box>
);

export default HeaderRooted;

