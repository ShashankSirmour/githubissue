import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import { InputBase, Typography } from '@mui/material';
import clsx from 'clsx';
import Button from '@mui/material/Button';
import { msToSeconds } from '@utils/function';
import PropTypes from 'prop-types';

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

export default function Game({
  mainText,
  time,
  highScore,
  onKeyPress,
  onGameReset,
  debugText,
}) {
  const classes = useStyles();

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
              {mainText}
            </Typography>
          </Grid>
          <Typography variant="h5" gutterBottom>
            Time: {msToSeconds(time)}s
          </Typography>
          <Typography variant="h5" gutterBottom>
            my best time: {highScore}s
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
          className={classes.grow}
          onKeyPress={(e) => onKeyPress(e.key)}
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

Game.defaultProps = {
  mainText: '',
  debugText: '',
  time: 0,
  highScore: 0,
  onKeyPress: () => {},
  onGameReset: () => {},
};

Game.propTypes = {
  mainText: PropTypes.string,
  time: PropTypes.number,
  debugText: '',
  highScore: PropTypes.number,
  onKeyPress: PropTypes.func,
  onGameReset: PropTypes.func,
};
