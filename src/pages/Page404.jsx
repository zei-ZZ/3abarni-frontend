import React from 'react';
import { styled } from '@mui/system';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import image from '../assets/images/404.png';
import { useNavigate } from 'react-router-dom';

const StyledImage = styled('img')({
  maxWidth: '100%',
  height: 'auto',
});

const StyledTypography = styled(Typography)({
  marginBottom: theme => theme.spacing(2),
});

const StyledButton = styled(Button)({
  marginTop: theme => theme.spacing(3),
  // Additional styles for the contained and medium-sized button
  '&.MuiButton-contained': {
    backgroundColor: '#000', // Change the background color as needed
    color: '#ffffff', // Change the text color as needed
  },
  '&.MuiButton-sizeMedium': {
    fontSize: '1rem', // Adjust the font size as needed
  },
});

const StyledContainer = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh', // Ensure the container takes at least the full height of the viewport
  padding: theme => theme.spacing(4),
  });

function NotFoundImage() {
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  const handleButtonClick = () => {
    // Perform any necessary actions before navigation
    navigate('/login'); // Navigate to the default route (home page)
  };
  return (
    <StyledContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <StyledImage src={image} alt="Not Found" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <div>
            <StyledTypography variant="h4">
              Something is not right...
            </StyledTypography>
            <Typography variant="body1" color="textSecondary" paragraph>
              Page you are trying to open does not exist. You may have mistyped the address, or the
              page has been moved to another URL. If you think this is an error contact support.
            </Typography>
            <StyledButton variant="contained" size="medium" onClick={handleButtonClick}>
              Get back to the home page
            </StyledButton>
          </div>
        </Grid>

      </Grid>
    </StyledContainer>
  );
}

export default NotFoundImage;
