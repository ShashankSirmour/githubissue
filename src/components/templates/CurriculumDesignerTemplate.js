import { Container, CustomIconButton, GenricButton } from '@components/atomic';
import { ButtonGroup, Divider, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PropTypes from 'prop-types';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { DraggableActionStandardCard } from '@components/organisms';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { useState } from 'react';

const sx = {
  root: {
    height: '100%',
    overflow: 'hidden',
  },
  grow: {
    flexGrow: 1,
  },
  title: {
    color: 'text.secondary',
  },
  title2: {
    fontSize: '1rem',
    fontWeight: '600',
  },
  subTitle: {
    color: 'text.secondary',
  },
};

const grid = 8;

const getListStyle = () => ({
  // background: isDraggingOver ? 'lightblue' : 'lightgrey',
  // padding: grid,
  width: '100%',
});

const initSkipData = {
  skipIndex: 0,
  skipCount: 0,
};

function CurriculumDesignerTemplate({
  title,
  data,
  onImportData,
  onExportData,
  onIndentOrOutdent,
  onDelete,
  onAddElement,
  onInputValueChange,
  onMoveData,
}) {
  const [skipData, setSkipData] = useState({ ...initSkipData });

  const getFilterdData = () => {
    const copyData = [...data];
    copyData.splice(skipData.skipIndex, skipData.skipCount);
    return copyData;
  };

  return (
    <Container sx={sx.root}>
      <Grid container direction="column" wrap="nowrap">
        <Grid
          item
          container
          wrap="nowrap"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid item>
            <Typography variant="h4" sx={sx.title}>
              {title}
            </Typography>
          </Grid>
          <Grid item container wrap="nowrap" alignItems="center" width="auto">
            <ButtonGroup variant="outlined">
              <CustomIconButton
                icon={<FileUploadIcon />}
                type="file"
                component="label"
              >
                <input
                  onChange={onImportData}
                  accept="application/JSON"
                  id="contained-button-file"
                  type="file"
                  hidden
                />
                Import
              </CustomIconButton>

              <CustomIconButton
                icon={<FileDownloadIcon />}
                onClick={onExportData}
              >
                Export
              </CustomIconButton>
            </ButtonGroup>
          </Grid>
        </Grid>
        <Divider />
        <Grid item container justifyContent="space-between" py={1}>
          <Grid item xs={4} sm={1.6}>
            <Typography sx={sx.title2}>Action</Typography>
            <Typography sx={sx.subTitle}>
              Move, indent, Outdent, Delete
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={sx.title2}>Standard</Typography>
            <Typography sx={sx.subTitle}>The text of the standard</Typography>
          </Grid>
        </Grid>
        <Divider />
        <Grid item container direction="column">
          <DragDropContext
            onDragStart={(t) => {
              const sourceIndex = t.source?.index;
              const sourceObj = data.at(sourceIndex);
              const skipIndexData = {
                skipIndex: sourceIndex + 1,
                skipCount: sourceObj.childCount,
              };

              setSkipData({ ...skipIndexData });

              // get index and remove child from main by filter
            }}
            onDragEnd={(t) => {
              const sourceIndex = t.source?.index;
              const destinationIndex = t.destination?.index;
              // console.log(sourceIndex, destinationIndex);
              const filteredData = getFilterdData();
              const filterSourceId = filteredData.at(sourceIndex).id;
              const filterDestinationId = filteredData.at(destinationIndex).id;
              const sourceId = data.findIndex((d) => d.id === filterSourceId);
              const destinationId = data.findIndex(
                (d) => d.id === filterDestinationId,
              );

              onMoveData(sourceId, destinationId);
              setSkipData({ ...initSkipData });
              //  clear filter and change posision
            }}
          >
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                >
                  {getFilterdData().map((item, index) => (
                    <div key={item.id}>
                      <DraggableActionStandardCard
                        data={item}
                        index={index}
                        draggableId={item.id}
                        onIndentOrOutdent={onIndentOrOutdent}
                        onDelete={onDelete}
                        onInputValueChange={onInputValueChange}
                      />
                      <Divider />
                    </div>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
        <GenricButton
          disableElevation
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={onAddElement}
        >
          <AddCircleOutlineIcon fontSize="small" sx={{ mr: 0.5 }} />
          <Typography>Add a standard</Typography>
        </GenricButton>
      </Grid>
    </Container>
  );
}

CurriculumDesignerTemplate.defaultProps = {
  title: 'Title',
  data: [],
  onAddElement: () => {},
  onIndentOrOutdent: () => {},
  onDelete: () => {},
  onMoveElement: () => {},
  onImportData: () => {},
  onExportData: () => {},
  onInputValueChange: () => {},
  onMoveData: () => {},
};

CurriculumDesignerTemplate.propTypes = {
  title: PropTypes.string,
  onIndentOrOutdent: PropTypes.func,
  onMoveElement: PropTypes.func,
  onDelete: PropTypes.func,
  onAddElement: PropTypes.func,
  onImportData: PropTypes.func,
  onExportData: PropTypes.func,
  onInputValueChange: PropTypes.func,
  data: PropTypes.array,
  onMoveData: PropTypes.func,
};

export default CurriculumDesignerTemplate;
