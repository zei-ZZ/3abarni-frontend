import { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import Pacman from 'pacman-react';
import Sidebar from './SideBar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const PacmanGame = () => {
  const [shouldRenderPacman, setShouldRenderPacman] = useState(true);
  const [score, setScore] = useState(0);
  const containerRef = useRef(null);
  const pacmanRootRef = useRef(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleRestart = () => {
    setShouldRenderPacman(false);
    setScore(0);
  };

  useEffect(() => {
    if (shouldRenderPacman) {
      const gridSize = 20; // Set the default gridSize
      const container = containerRef.current;
      pacmanRootRef.current = createRoot(container);
      pacmanRootRef.current.render(<Pacman gridSize={gridSize} />);
    } else {
      if (pacmanRootRef.current) {
        pacmanRootRef.current.unmount();
      }
    }
  }, [shouldRenderPacman]);

  useEffect(() => {
    // Delay the re-render of Pacman to ensure it's not unmounted synchronously during a render cycle
    if (!shouldRenderPacman) {
      setTimeout(() => {
        setOpenDialog(true);
      }, 0);
    }
  }, [shouldRenderPacman]);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setShouldRenderPacman(true); // Restart the game when the dialog is closed
  };

  return (
    <div style={{ display: 'flex', background: 'black' }}>
      {/* Render SideBar */}
      <Sidebar />
      <div style={{
        position: 'absolute',
        width: '773.61px',
        height: '931px',
        right: '0px', // Adjust the position to the right
        left: '700px',
        top: '0px',
        bottom: '0px',
        backgroundColor: 'black' // Add background color
      }} ref={containerRef}>
        {/* Render Pacman restart button */}
        <button onClick={handleRestart} style={{ position: 'absolute', top: '10px', right: '10px' }}>Restart Game</button>
      </div>
      {/* Render Score and Game Over Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Game Over</DialogTitle>
        <DialogContent>
          <div>
            <p>Score: {score}</p>
            {/* Add any other information about the finished game */}
          </div>
        </DialogContent>
        <DialogActions>
          <button onClick={handleCloseDialog}>Restart</button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default PacmanGame;
