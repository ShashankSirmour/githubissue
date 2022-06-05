import { useRef, useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import { InputBase, Typography } from '@mui/material';
import clsx from 'clsx';
import Button from '@mui/material/Button';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#0A1953',
  },
  fab: { top: '0', left: '0', margin: '2%' },
  grow: {
    flexGrow: 1,
  },
  mainRoot: {
    overflowY: 'auto',
  },
  mainArea: {
    height: '100%',
    padding: '20px',
  },
  charArea: {
    backgroundColor: '#fff',
    borderRadius: '5px',
  },
  mainText: {
    textTransform: 'uppercase',
    color: 'green',
    fontSize: '4rem',
    lineHeight: '4rem',
  },
}));

const msToSeconds = (ms) => (Math.round(ms) / 1000).toFixed(2);

function randomChar() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charactersLength = characters.length;
  return characters.charAt(Math.floor(Math.random() * charactersLength));
}

const getGameStateWithRandomChar = (round) => {
  const char = randomChar();
  return {
    round,
    char,
  };
};
export default function Map() {
  const classes = useStyles();
  const [time, setTime] = useState(0);
  const [gameState, setGameState] = useState(() =>
    getGameStateWithRandomChar(1),
  );
  const timerRef = useRef(null);
  const gameStatus = useRef(false);

  const onGameStart = () => {
    gameStatus.current = true;
    timerRef.current = setInterval(() => {
      setTime((t) => t + 10);
    }, 10);
  };

  const onGameStop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = null;
    gameStatus.current = false;
  };

  const onKeyPress = (e) => {
    if (gameState.round <= 20) {
      if (gameState.round === 1 && gameStatus.current === false) {
        gameStatus.current = true;
        onGameStart();
      }
      if (gameState.round < 20) {
        if (e.key?.toUpperCase() === gameState.char.toUpperCase()) {
          setGameState((gs) => getGameStateWithRandomChar(gs.round + 1));
        } else {
          setTime((t) => t + 500);
        }
      }
      //  win or loose
      else if (e.key?.toUpperCase() === gameState.char.toUpperCase()) {
        setGameState({ round: 0, char: 'Sucess' });
        onGameStop();
      } else {
        setTime((t) => t + 500);
      }
    }
  };

  const onGameReset = () => {
    onGameStop();
    setGameState(getGameStateWithRandomChar(1));
    setTime(0);
  };

  useEffect(() => () => onGameStop(), []);

  return (
    <Grid container direction="column" className={classes.root} wrap="nowrap">
      <Grid item className={clsx(classes.mainRoot, classes.grow)}>
        <Grid
          container
          className={classes.mainArea}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h3" gutterBottom>
            Type The Alpabet
          </Typography>
          <Typography variant="h5" align="center">
            Typing game to see how fast you type. Timer start when you do :)
          </Typography>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            className={classes.charArea}
            sx={{ my: 2, py: '10%' }}
          >
            <Typography variant="h1" className={classes.mainText}>
              {gameState.char}
            </Typography>
          </Grid>
          <Typography variant="h5" gutterBottom>
            Time: {msToSeconds(time)}s
          </Typography>
          <Typography variant="h5" gutterBottom>
            my best time: {1.34}s
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        wrap="nowrap"
        component={Paper}
        sx={{ borderRadius: 0 }}
      >
        <InputBase
          autoFocus
          onKeyPress={onKeyPress}
          className={classes.grow}
          inputProps={{ style: { textTransform: 'uppercase' } }}
          sx={{ pl: 1.4, px: 2, color: '#000' }}
        />
        <Button
          disableElevation
          disableFocusRipple
          disableRipple
          onClick={onGameReset}
          variant="contained"
          sx={{ borderRadius: 0, textTransform: 'none' }}
        >
          Reset
        </Button>
      </Grid>
    </Grid>
  );
}
