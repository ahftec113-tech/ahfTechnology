import { types } from '../types';

export const addCopyProject = payload => ({
  type: types.createCopy,
  payload,
});

export const cleaCopyProject = () => ({
  type: types.clearCopies,
});
export const deleteCopyProject = payload => ({
  type: types.deleteCopy,
  payload,
});
