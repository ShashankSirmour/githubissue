import { Container } from '@components/atomic';
import { GithubFooter, GithubHeader, IssueCard } from '@components/moleculer';
import { Box, Divider, Grid, Typography } from '@mui/material';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroller';

const sx = {
  root: {
    height: '100%',
    overflow: 'hidden',
  },
  container: {
    border: { sm: '1px solid #D0D7DE' },
    borderTop: '1px solid #D0D7DE',
  },
  grow: { flexGrow: 1 },
  childHeader: { backgroundColor: '#F6F8FA', borderRadius: '4px 4px 0px 0px' },
  divider: { borderColor: '#D0D7DE' },
};

function GithubIssueTemplate({ loadMore, data, loading }) {
  return (
    <Grid
      container
      direction="column"
      minHeight="100vh"
      style={{ overflow: 'hidden' }}
    >
      <Grid item>
        <GithubHeader />
      </Grid>
      <Container sx={sx.root} marginTop={5} marginBottom={5}>
        <Grid container direction="column" sx={sx.container} borderRadius={1}>
          <Grid item container px={2} py={3} sx={sx.childHeader}>
            <AdjustOutlinedIcon fontSize="small" />
            <Typography fontWeight="500" ml={1}>
              625 Open
            </Typography>
          </Grid>
          <Grid item>
            <InfiniteScroll
              pageStart={1}
              loadMore={loadMore}
              hasMore
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
              // useWindow={false}
            >
              {data.map((d) => (
                <div key={d.id}>
                  <Divider sx={sx.divider} />
                  <IssueCard data={d} />
                </div>
              ))}
            </InfiniteScroll>
          </Grid>
        </Grid>
      </Container>

      <Grid item sx={sx.grow} />
      <Grid item container px={{ xs: 1, sm: 2 }} direction="column">
        <Divider />
        <GithubFooter />
      </Grid>
    </Grid>
  );
}

GithubIssueTemplate.defaultProps = {
  data: [],
  loading: false,
  loadMore: () => {},
};

GithubIssueTemplate.propTypes = {
  data: PropTypes.array,
  loading: PropTypes.bool,
  loadMore: PropTypes.func,
};

export default GithubIssueTemplate;
