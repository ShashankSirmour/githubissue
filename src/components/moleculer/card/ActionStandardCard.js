import { Grid, IconButton, InputBase, Paper } from '@mui/material';
import React, { memo } from 'react';
import { ReactComponent as MoveIcon } from '@assets/move.svg';
import { ReactComponent as LeftIcon } from '@assets/left.svg';
import { ReactComponent as RightIcon } from '@assets/right.svg';
import { ReactComponent as DeleteIcon } from '@assets/delete.svg';
import { DefaultTooltip } from '@components/atomic';
import PropTypes from 'prop-types';
import { useDebouncedCallback } from '@hooks/useDebounceCallback';

const sx = {
  grow: {
    flexGrow: 1,
  },
  spacing: { backgroundColor: 'background.empty' },
  iconButton: { '&:hover': { color: 'secondary.main' } },
  font0: {
    fontSize: 17,
    fontWeight: '700',
    color: 'secondary.main',
  },
  font1: { fontSize: 16, fontWeight: '600' },
  font2: {
    fontSize: 15,
    color: '#808080',
  },
  font3: {
    fontSize: 14,
    color: '#808080',
  },
  font4: {
    fontSize: 13,
    color: 'text.secondary',
  },
  font5: {
    fontSize: 12,
  },
  default: {
    paddingLeft: 6,
    // color: '#000',

    fontSize: 12,
    input: {
      '&::placeholder': {
        textOverflow: 'ellipsis !important',
        color: '#808080',
        fontSize: 14,
        fontWeight: 600,
      },
    },
  },
};

function ActionStandardCard({
  setDraggable,
  index,
  onIndentOrOutdent,
  onDelete,
  onInputValueChange,
  data,
}) {
  const onValueChange = useDebouncedCallback(
    (value) => onInputValueChange(value, index),
    500,
  );

  return (
    <Paper elevation={0} square>
      <Grid container wrap="nowrap">
        <Grid
          item
          container
          wrap="nowrap"
          width="auto"
          py={1}
          alignItems="center"
          mr={3}
        >
          <DefaultTooltip
            title="Move"
            disableFocusListener
            arrow
            placement="top"
          >
            <IconButton
              size="small"
              sx={sx.iconButton}
              disableRipple
              onMouseEnter={() => setDraggable(true)}
              onMouseLeave={() => setDraggable(false)}
            >
              <MoveIcon width={15} height={15} />
            </IconButton>
          </DefaultTooltip>
          <DefaultTooltip title="Outdent" arrow placement="top">
            <IconButton
              size="small"
              sx={sx.iconButton}
              onClick={() => onIndentOrOutdent(-1, index)}
            >
              <LeftIcon width={15} height={15} />
            </IconButton>
          </DefaultTooltip>
          <DefaultTooltip title="Indent" arrow placement="top">
            <IconButton
              size="small"
              sx={sx.iconButton}
              onClick={() => onIndentOrOutdent(1, index)}
            >
              <RightIcon width={15} height={15} />
            </IconButton>
          </DefaultTooltip>
          <DefaultTooltip title="Delete" arrow placement="top">
            <IconButton
              size="small"
              sx={sx.iconButton}
              onClick={() => onDelete(index, data.id)}
            >
              <DeleteIcon width={15} height={15} />
            </IconButton>
          </DefaultTooltip>
        </Grid>
        <Grid item sx={sx.spacing} width={40} ml={3 * data.indentation} />
        <Grid item sx={sx.grow} py={1}>
          <InputBase
            sx={[sx.default, sx[`font${data.indentation}`]]}
            fullWidth
            defaultValue={data.text}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder="Type standard here (e.g. Number)"
          />
        </Grid>
      </Grid>
    </Paper>
  );
}

ActionStandardCard.defaultProps = {
  setDraggable: () => {},
  onIndentOrOutdent: () => {},
  onDelete: () => {},
  onInputValueChange: () => {},
};
ActionStandardCard.propTypes = {
  setDraggable: PropTypes.func,
  onIndentOrOutdent: PropTypes.func,
  onDelete: PropTypes.func,
  index: PropTypes.number.isRequired,
  onInputValueChange: PropTypes.func,
  data: PropTypes.object.isRequired,
};

export default memo(ActionStandardCard);
