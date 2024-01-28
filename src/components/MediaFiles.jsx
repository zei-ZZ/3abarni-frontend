import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function MediaFiles() {

  return (
    <Box sx={{ width: '100%', bgcolor: 'white', padding: '16px' }}>
      <Tabs sx={{ marginLeft: 'auto' }}>
        <Tab label="Media" />
        <Tab label="Files" />
        <Tab label="Links" />
      </Tabs>
    </Box>
  );
}