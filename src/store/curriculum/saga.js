/* eslint-disable no-restricted-globals */
import {
  INDENT_CURICULUM,
  MOVE_CURICULUM,
  OUTDENT_CURICULUM,
} from '@store/actionTypes';
import { put, select, takeEvery } from 'redux-saga/effects';
import { importData, updateCurriculum } from './actions';

export const getData = (state) => state.curriculum.data;
// worker saga: makes the api call when watcher saga sees the action
function* curriculumMoveWorker({ payload }) {
  try {
    const { sourceIndex, destinationIndex } = payload;
    if (isNaN(destinationIndex)) {
      throw new Error('no destination Index');
    }
    const data = yield select(getData);
    const updateData = {};
    const counterMap = {};
    const source = data.at(sourceIndex);
    const sourceChildCount = source.childCount;
    const destination = data.at(destinationIndex);

    // update souce parent child count
    let sourceUpIndex = source.parentIndex;
    while (sourceUpIndex != null) {
      const sourceUpObj = data.at(sourceUpIndex);
      counterMap[sourceUpObj.id] = {
        ...sourceUpObj,
        childCount: sourceUpObj.childCount - (source.childCount + 1),
      };
      sourceUpIndex = sourceUpObj.parentIndex;
    }

    // delete parent count and add to correct parent
    let nextDestChildIndex = destinationIndex;
    while (nextDestChildIndex < data.length) {
      const destChildObj = data.at(nextDestChildIndex);
      if (destChildObj.indentation <= source.indentation) {
        break;
      }
      let destUpIndex = destChildObj.parentIndex;
      while (destUpIndex != null) {
        const destUpObj = data.at(destUpIndex);
        if (destUpObj.indentation >= source.indentation) {
          if (destUpObj.id in counterMap) {
            counterMap[destUpObj.id] = {
              ...counterMap[destUpObj.id],
              childCount:
                counterMap[destUpObj.id].childCount -
                (destination.childCount + 1),
            };
          } else {
            counterMap[destUpObj.id] = {
              ...destUpObj,
              childCount: destUpObj.childCount - (destination.childCount + 1),
            };
          }
          destUpIndex = destUpObj.parentIndex;
        } else {
          destUpIndex = null;
        }
      }

      let found = false;
      for (let i = source.childCount; i >= 0; i -= 1) {
        const upObj = data.at(sourceIndex + i);
        if (!found && upObj.indentation < destChildObj.indentation) {
          found = true;
          // parent assign and increase count
          updateData[destChildObj.id] = {
            ...destChildObj,
            parentIndex: destinationIndex + i,
          };
        }
        if (found) {
          if (upObj.id in counterMap) {
            counterMap[upObj.id] = {
              ...counterMap[upObj.id],
              childCount:
                counterMap[upObj.id].childCount + (destChildObj.childCount + 1),
            };
          } else {
            counterMap[upObj.id] = {
              ...upObj,
              childCount: upObj.childCount + (upObj.childCount + 1),
            };
          }
        }
      }
      nextDestChildIndex += destChildObj.childCount + 1;
    }

    // console.log(counterMap);
    // console.log('update', updateData);
    // find parent of currrent element and update count

    let parentIndex = null;

    if (destinationIndex === 0) {
      parentIndex = null;
    } else {
      let upObj = data[destinationIndex - 1];
      parentIndex = destinationIndex - 1;
      while (
        !(upObj.indentation < source.indentation || upObj.parentIndex === null)
      ) {
        parentIndex = upObj.parentIndex;
        upObj = data[upObj.parentIndex];
      }

      if (upObj.indentation >= source.indentation) {
        parentIndex = null;
      }
    }

    if (parentIndex != null) {
      const parentObj = data.at(parentIndex);
      if (parentObj.id in counterMap) {
        counterMap[parentObj.id] = {
          ...counterMap[parentObj.id],
          childCount:
            counterMap[parentObj.id].childCount + (sourceChildCount + 1),
        };
      } else {
        updateData[parentObj.id] = {
          ...parentObj,
          childCount: parentObj.childCount + (sourceChildCount + 1),
        };
      }
    }

    updateData[source.id] = { ...source, parentIndex };

    const finalUpdate = { ...updateData, ...counterMap };

    const finalData = data.map((d) =>
      finalUpdate[d.id] ? finalUpdate[d.id] : d,
    );
    const sourceData = finalData.slice(
      sourceIndex,
      sourceIndex + sourceChildCount + 1,
    );

    const deletedArray = [
      ...finalData.slice(0, sourceIndex),
      ...finalData.slice(sourceIndex + sourceChildCount + 1, finalData.length),
    ];

    let finalDestination = destinationIndex;
    if (destinationIndex > sourceIndex) {
      finalDestination -= sourceChildCount;
    }

    const finalUpdateData = [
      ...deletedArray.slice(0, finalDestination),
      ...sourceData,
      ...deletedArray.slice(finalDestination, deletedArray.length),
    ];

    // yield put(updateCurriculum(finalUpdate));
    // yield put(importData(finalUpdateData));

    //
  } catch (error) {
    // dispatch a failure action to the store with the error
    console.error(error);
  }
}

// { id, indentation: 0, parentIndex: null, childCount: 0, text: '' };

function* curriculumIndentWorker({ payload }) {
  try {
    const updateData = {};
    const { index } = payload;
    const data = yield select(getData);
    const obj = data.at(index);
    const indentation = obj.indentation + 1;

    let parentIndex = null;
    // up
    // go up until indentation < currentIndentation or null
    if (index === 0) {
      parentIndex = null;
    } else {
      let upObj = data[index - 1];
      parentIndex = index - 1;
      while (!(upObj.indentation < indentation || upObj.parentIndex === null)) {
        parentIndex = upObj.parentIndex;
        upObj = data[upObj.parentIndex];
      }

      if (upObj.indentation >= indentation) {
        parentIndex = null;
      }
    }

    // down
    let childRemoved = 0;
    for (let i = 1; i <= obj.childCount; i += 1) {
      const childObj = data[index + i];
      if (childObj.indentation === indentation) {
        // asign parent
        childRemoved += childObj.childCount + 1;
        updateData[childObj.id] = { ...childObj, parentIndex };
      }
    }

    if (parentIndex != null && parentIndex !== obj.parentIndex) {
      const parentObj = data[parentIndex];
      updateData[parentObj.id] = {
        ...parentObj,
        childCount: parentObj.childCount + obj.childCount + 1,
      };
      // put parent index in updateData
    }

    updateData[obj.id] = {
      ...obj,
      childCount: obj.childCount - childRemoved,
      parentIndex,
      indentation,
    };
    yield put(updateCurriculum(updateData));
  } catch (error) {
    // dispatch a failure action to the store with the error
    console.error(error);
  }
}

function* curriculumOutdentWorker({ payload }) {
  try {
    const updateData = {};
    const { index } = payload;
    const data = yield select(getData);
    const obj = data.at(index);
    if (obj.indentation <= 0) {
      throw new Error('indentation min value');
    }

    const indentation = obj.indentation - 1;

    let parentIndex = null;

    // down
    let childAdded = 0;
    let nextIndex = obj.childCount + index + 1;

    while (nextIndex < data.length) {
      const downObj = data.at(nextIndex);
      if (downObj.indentation <= indentation) {
        break;
      } else {
        // sibling
        childAdded += downObj.childCount + 1;
        updateData[downObj.id] = {
          ...downObj,
          parentIndex: index,
        };
      }
      nextIndex += downObj.childCount + 1;
    }

    // up
    if (obj.parentIndex != null) {
      const parentObj = data[obj.parentIndex];
      if (parentObj.indentation < indentation) {
        parentIndex = obj.parentIndex;
      } else {
        parentIndex = parentObj.parentIndex;
        updateData[parentObj.id] = {
          ...parentObj,
          childCount: parentObj.childCount - obj.childCount - childAdded - 1,
        };
      }

      // put parent index in updateData
    }

    updateData[obj.id] = {
      ...obj,
      childCount: obj.childCount + childAdded,
      parentIndex,
      indentation,
    };

    yield put(updateCurriculum(updateData));
  } catch (error) {
    // dispatch a failure action to the store with the error
    console.error(error);
  }
}

// watcher saga: watches for actions dispatched to the store, starts worker saga
export default function* curriculumWatcherSaga() {
  yield takeEvery(INDENT_CURICULUM, curriculumIndentWorker);
  yield takeEvery(OUTDENT_CURICULUM, curriculumOutdentWorker);
  yield takeEvery(MOVE_CURICULUM, curriculumMoveWorker);
}
