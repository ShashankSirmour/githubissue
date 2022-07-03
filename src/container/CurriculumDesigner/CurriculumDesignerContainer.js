import { CurriculumDesignerTemplate } from '@components/templates';
import {
  addNewCurriculum,
  changeInputValue,
  deleteCurriculum,
  importData,
  indentCurriculum,
  moveCurriculum,
  outdentCurriculum,
} from '@store/curriculum';
import { downloadFile, isVlidCurriculumJson } from '@utils/function';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function CurriculumDesignerContainer() {
  const dispatch = useDispatch();
  const data = useSelector((store) => store.curriculum.data);

  const onIndentOrOutdent = useCallback((changeBy, index) => {
    if (changeBy === 1) {
      dispatch(indentCurriculum(index));
    } else if (changeBy === -1) {
      dispatch(outdentCurriculum(index));
    }
  }, []);

  const onDelete = useCallback((index, id) => {
    dispatch(deleteCurriculum(id, index));
  }, []);

  const onImportData = useCallback((event) => {
    const fileReader = new FileReader();
    fileReader.readAsText(event.target.files[0], 'UTF-8');
    fileReader.onload = (e) => {
      const newData = JSON.parse(e.target.result);
      if (isVlidCurriculumJson(newData)) {
        dispatch(importData(newData));
      }
    };
  }, []);

  const onExportData = useCallback(async () => {
    await downloadFile(data);
  }, [data]);

  const onAddElement = useCallback(() => {
    dispatch(addNewCurriculum());
  }, []);

  const onInputValueChange = useCallback((value, index) => {
    dispatch(changeInputValue(value, index));
  }, []);

  const onMoveData = useCallback((source, destination) => {
    dispatch(moveCurriculum(source, destination));
  }, []);

  return (
    <CurriculumDesignerTemplate
      onIndentOrOutdent={onIndentOrOutdent}
      onDelete={onDelete}
      onAddElement={onAddElement}
      onImportData={onImportData}
      onExportData={onExportData}
      title="Mathematics"
      onInputValueChange={onInputValueChange}
      onMoveData={onMoveData}
      data={data}
    />
  );
}
