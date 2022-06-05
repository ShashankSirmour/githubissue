import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import { InputBase } from '@mui/material';
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
    color: 'green',
    backgroundColor: '#fff',
    textTransform: 'uppercase',
  },
}));

export default function Map() {
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
          <Grid item>rule</Grid>
          <Grid
            item
            container
            alignItems="center"
            justifyContent="center"
            fontSize="5rem"
            className={classes.charArea}
            sx={{ my: 2, py: '10%' }}
          >
            H
          </Grid>
          <Grid item>guide</Grid>
        </Grid>
      </Grid>
      <Grid
        item
        container
        wrap="nowrap"
        component={Paper}
        sx={{ borderRadius: 0 }}
      >
        <InputBase className={classes.grow} sx={{ pl: 1.4, px: 2 }} />
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
