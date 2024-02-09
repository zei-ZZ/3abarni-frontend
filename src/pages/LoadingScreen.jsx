import React, { useEffect, useState } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { styled, Stack } from '@mui/system';
import Logo from "../assets/images/logo.png";

const StyledImage = styled('img')({
  maxWidth: '100%',
  height: 'auto',
});

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer); // Stop the interval when progress reaches 100%
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 200000); // Increase the interval to slow down loading

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Grid item xs={12} sm={6}>
        <StyledImage src={Logo} alt="Company Logo" />
      </Grid>
      <Stack
        sx={{
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '100%', // Set width to 100%
          margin: 'auto',
        }}
        spacing={2}
      >
        <LinearProgress variant="determinate" value={progress} color="secondary" sx={{ width: '100%', color: 'black' }} />
      </Stack>
    </Container>
  );
};

export default LoadingScreen;
