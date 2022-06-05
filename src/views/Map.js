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

export default function Map() {
  const classes = useStyles();
  const [time, setTime] = useState(0);
  const [gameState, setGameState] = useState(0);
  const timerRef = useRef(null);

  const onGameStart = () => {
    timerRef.current = setInterval(() => {}, 10);
  };

  useEffect(
    () => () => timerRef.current && clearInterval(timerRef.curretn),
    [],
  );

  const onKeyPress = () => {};

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
              SUCESS
            </Typography>
          </Grid>
          <Typography variant="h5" gutterBottom>
            Time: 0
          </Typography>
          <Typography variant="h5" gutterBottom>
            my best time: 1.34s
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
          autoCapitalize
          className={classes.grow}
          inputProps={{ style: { textTransform: 'uppercase' } }}
          sx={{ pl: 1.4, px: 2, color: '#000' }}
        />
        <Button
          disableElevation
          disableFocusRipple
          disableRipple
          variant="contained"
          sx={{ borderRadius: 0, textTransform: 'none' }}
        >
          Reset
        </Button>
      </Grid>
    </Grid>
  );
}
