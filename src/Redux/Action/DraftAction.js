import { types } from '../types';

export const addDraftProject = payload => ({
  type: types.saveDraft,
  payload,
});

export const cleaDraftProject = () => ({
  type: types.clearDrafts,
});
export const deleteDraftProject = payload => ({
  type: types.deleteDraft,
  payload,
});
