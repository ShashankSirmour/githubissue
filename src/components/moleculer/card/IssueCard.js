import {
  Avatar,
  AvatarGroup,
  Box,
  Chip,
  Grid,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import AdjustOutlinedIcon from '@mui/icons-material/AdjustOutlined';
import { useTheme } from '@emotion/react';
import PropTypes from 'prop-types';
import ModeCommentOutlinedIcon from '@mui/icons-material/ModeCommentOutlined';
import AltRouteOutlinedIcon from '@mui/icons-material/AltRouteOutlined';

function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return `${Math.floor(interval)} years`;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return `${Math.floor(interval)} months`;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return `${Math.floor(interval)} days`;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return `${Math.floor(interval)} hours`;
  }
  interval = seconds / 60;
  if (interval > 1) {
    return `${Math.floor(interval)} minutes`;
  }
  return `${Math.floor(seconds)} seconds`;
}
const sx = {
  icon: {
    marginRight: 1,
    color: 'green',
  },
  primaryText: {
    fontSize: '1.1rem',
    fontWeight: '500',
  },
  secondaryText: {
    fontSize: '0.8rem',
  },
  commentIcon: {
    color: '#57606A',
    marginRight: 0.2,
    fontSize: 18,
  },
  avatar: {},
  avatarGroup: {
    '& .MuiAvatar-root': {
      width: 18,
      height: 18,
      fontSize: 12,
      marginLeft: -0.75,
    },
  },
};
export default function IssueCard({ data }) {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Grid
      container
      wrap="nowrap"
      p={2}
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <Grid item container wrap="nowrap" alignItems="flex-start" xs={12} sm={8}>
        <AdjustOutlinedIcon fontSize="small" sx={sx.icon} />
        <Grid item container direction="column" wrap="nowrap">
          <Typography sx={sx.primaryText} gutterBottom>
            {data.title}
            {data.labels &&
              data.labels.map((l) => (
                <Chip
                  label={l.name}
                  sx={[
                    { ml: 0.4, mb: 0.4, backgroundColor: `#${l.color}` },
                    l.color === 'b60205' && { color: '#fff' },
                  ]}
                  size="small"
                />
              ))}
          </Typography>
          <Typography variant="subtitle2" sx={sx.secondaryText}>
            {`#${data.number} ${data.state} ${timeSince(
              new Date(data.updated_at),
            )} ago by ${data?.user?.login || ''}`}
          </Typography>
        </Grid>
      </Grid>
      {isSmUp && (
        <Grid item sm={3} container justifyContent="space-between">
          <Grid item />
          {data?.assignees?.length > 0 && (
            <AvatarGroup max={4} sx={sx.avatarGroup}>
              {data.assignees.map((a) => (
                <Avatar sx={sx.avatar} alt={a.login} src={a.avatar_url} />
              ))}
            </AvatarGroup>
          )}
          {data.pull_request && (
            <Box alignItems="start" display="flex">
              <AltRouteOutlinedIcon fontSize="small" sx={sx.commentIcon} />
              <div>{1}</div>
            </Box>
          )}
          {data?.comments > 0 && (
            <Box alignItems="start" display="flex">
              <ModeCommentOutlinedIcon fontSize="small" sx={sx.commentIcon} />
              <div>{data.comments}</div>
            </Box>
          )}
        </Grid>
      )}
    </Grid>
  );
}

IssueCard.defaultProps = {
  data: {},
};
IssueCard.propTypes = {
  data: PropTypes.object,
};
