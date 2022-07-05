/* eslint-disable jsx-a11y/anchor-is-valid */
import { ButtonBase, Grid, Link, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { ReactComponent as RepoIcon } from '@assets/repo.svg';
import { useTheme } from '@emotion/react';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import ForkRightIcon from '@mui/icons-material/ForkRight';
import { GitTab, GitTabs } from '@components/atomic';
import CodeIcon from '@mui/icons-material/Code';
import AdjustIcon from '@mui/icons-material/Adjust';
import TimelineIcon from '@mui/icons-material/Timeline';
import GppMaybeOutlinedIcon from '@mui/icons-material/GppMaybeOutlined';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import InsertChartOutlinedOutlinedIcon from '@mui/icons-material/InsertChartOutlinedOutlined';
import MergeOutlinedIcon from '@mui/icons-material/MergeOutlined';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';

const sx = {
  root: {
    px: { xs: 1, sm: 4 },
    pt: 2,
    width: '100vw',
    backgroundColor: '#F6F8FA',
  },
  breadcrumbs: {
    fontSize: 20,
    lineHeight: 1.5,
    fontWeight: 400,
  },
  link: {
    color: '#0969E0',
  },
  repoIcon: {
    marginRight: 4,
    color: '#57606A',
  },
  border: { sm: '1px solid #D0D7DE' },
  buttonBase: { borderRadius: 2, py: 0.5, px: 1, color: '#57606A' },
  buttonBaseWithSub: {
    borderRadius: '8px 0px 0px 8px',
    py: 0.5,
    px: 1,
    color: '#57606A',
  },
  sideIcon: { fontSize: 18, mr: 0.4 },
  sub: {
    borderRadius: '0px 8px 8px 0px',
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    px: 1,
  },
  tabIcon: {
    color: '#57606A',
    fontSize: 18,
  },
};
export default function GithubHeader() {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Grid container direction="column" sx={sx.root}>
      <Grid item container wrap="nowrap" justifyContent="space-between">
        <Grid item container sx={sx.breadcrumbs} alignItems="center">
          <RepoIcon style={sx.repoIcon} />
          <Link underline="hover" sx={sx.link}>
            facebook
          </Link>
          <Box mx={0.4} color="#57606A">
            /
          </Box>
          <Link underline="hover" fontWeight={500} sx={sx.link}>
            react
          </Link>
        </Grid>
        {isSmUp && (
          <Grid
            item
            container
            justifyContent="flex-end"
            alignItems="center"
            wrap="nowrap"
          >
            <Box borderRadius={2} border={sx.border} mr={1}>
              <ButtonBase sx={sx.buttonBase}>
                <NotificationsOutlinedIcon sx={sx.sideIcon} />
                Notifications
              </ButtonBase>
            </Box>
            <Box borderRadius={2} border={sx.border} mr={1} flexWrap="nowrap">
              <Grid container width="auto" wrap="nowrap">
                <ButtonBase sx={sx.buttonBaseWithSub}>
                  <StarBorderOutlinedIcon sx={sx.sideIcon} />
                  Star
                </ButtonBase>
                <Box sx={sx.sub}>175k</Box>
              </Grid>
            </Box>
            <Box borderRadius={2} border={sx.border} flexWrap="nowrap">
              <Grid container width="auto" wrap="nowrap">
                <ButtonBase sx={sx.buttonBaseWithSub}>
                  <ForkRightIcon sx={sx.sideIcon} />
                  Fork
                </ButtonBase>
                <Box sx={sx.sub}>35.5k</Box>
              </Grid>
            </Box>
          </Grid>
        )}
      </Grid>
      <Grid item container mt={3}>
        <GitTabs value={1} scrollButtons="auto" variant="scrollable">
          <GitTab
            disableRipple
            icon={<CodeIcon sx={sx.tabIcon} />}
            iconPosition="start"
            label="Code"
          />
          <GitTab
            disableRipple
            icon={<AdjustIcon sx={sx.tabIcon} />}
            iconPosition="start"
            label="Issues"
          />
          <GitTab
            disableRipple
            icon={<MergeOutlinedIcon sx={sx.tabIcon} />}
            iconPosition="start"
            label="Pull Request"
          />
          <GitTab
            disableRipple
            icon={<PlayCircleOutlinedIcon sx={sx.tabIcon} />}
            iconPosition="start"
            label="Action"
          />
          <GitTab
            disableRipple
            icon={<InsertChartOutlinedOutlinedIcon sx={sx.tabIcon} />}
            iconPosition="start"
            label="Projects"
          />
          <GitTab
            disableRipple
            icon={<MenuBookOutlinedIcon sx={sx.tabIcon} />}
            iconPosition="start"
            label="Wiki"
          />
          <GitTab
            disableRipple
            icon={<GppMaybeOutlinedIcon sx={sx.tabIcon} />}
            iconPosition="start"
            label="Security"
          />
          <GitTab
            disableRipple
            icon={<TimelineIcon sx={sx.tabIcon} />}
            iconPosition="start"
            label="Insights"
          />
        </GitTabs>
      </Grid>
    </Grid>
  );
}
