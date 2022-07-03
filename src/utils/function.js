import { nanoid } from 'nanoid';

export const getNewCurriculum = () => {
  const id = nanoid() + new Date().getTime();
  return { id, indentation: 0, parentIndex: null, childCount: 0, text: '' };
};

export const downloadFile = async (data) => {
  const fileName = 'curriculum';
  const json = JSON.stringify(data);
  const blob = new Blob([json], { type: 'application/json' });
  const href = await URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = href;
  link.download = `${fileName}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const contain = (obj, ...keys) => {
  for (let i = 0; i < keys.length; i += 1) {
    if (!Object.prototype.hasOwnProperty.call(obj, keys.at(i))) {
      return false;
    }
  }
  return true;
};

export const isVlidCurriculumJson = (data) => {
  try {
    for (let i = 0; i < data.length; i += 1) {
      if (
        !contain(
          data[i],
          'id',
          'indentation',
          'parentIndex',
          'childCount',
          'text',
        )
      ) {
        return false;
      }
    }
  } catch (e) {
    return false;
  }

  return true;
};
