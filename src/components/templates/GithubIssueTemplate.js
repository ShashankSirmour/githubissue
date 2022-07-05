import { Container, DropButton } from '@components/atomic';
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

function GithubIssueTemplate({ loadMore, data, end }) {
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
          <Grid
            item
            container
            px={2}
            py={3}
            sx={sx.childHeader}
            alignItems="center"
            justifyContent="space-between"
            wrap="nowrap"
          >
            <Grid item container wrap="nowrap" width="auto">
              <AdjustOutlinedIcon fontSize="small" sx={{ mr: 1 }} />
              <Typography fontWeight="500">625 Open</Typography>
            </Grid>
            <Grid item container width="auto">
              <DropButton title="Author" sx={{ mr: 1 }} />
              <DropButton title="Label" sx={{ mr: 1 }} />
              <DropButton title="Projects" />
            </Grid>
          </Grid>
          <Grid item>
            <InfiniteScroll
              pageStart={1}
              loadMore={loadMore}
              hasMore={!end}
              loader={
                <div className="loader" key={0}>
                  Loading ...
                </div>
              }
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
  end: false,
  loadMore: () => {},
};

GithubIssueTemplate.propTypes = {
  data: PropTypes.array,
  end: PropTypes.bool,
  loadMore: PropTypes.func,
};

export default GithubIssueTemplate;
