import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import { InputBase } from '@mui/material';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  root: {
    height: '100vh',
    overflow: 'hidden',
  },
  fab: { top: '0', left: '0', margin: '2%' },
  grow: {
    flexGrow: 1,
  },
  content: {
    overflowY: 'scroll',
  },
}));

export default function Map() {
  const classes = useStyles();

  return (
    <Grid container direction="column" className={classes.root} wrap="nowrap">
      <Grid item className={clsx(classes.content, classes.grow)}>
        <Grid container>main</Grid>
      </Grid>
      <Grid item container wrap="nowrap" component={Paper}>
        <InputBase className={classes.grow} />
      </Grid>
    </Grid>
  );
}
