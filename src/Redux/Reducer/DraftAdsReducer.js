import { types } from '../types';
import uuid from 'react-native-uuid';

const initial_state = {
  DraftAds: [], // will store objects
};

const actionMap = {
  // Add or Update Draft
  [types.saveDraft]: (state, action) => {
    let newDraft = action.payload;

    // If no id is provided → generate one
    if (!newDraft.id) {
      newDraft = { ...newDraft, id: uuid.v4() };
    }

    // Check if draft with same id already exists → update
    const exists = state.DraftAds.find(d => d.id === newDraft.id);

    return {
      ...state,
      DraftAds: exists
        ? state.DraftAds.map(d =>
            d.id === newDraft.id ? { ...d, ...newDraft } : d,
          )
        : [...state.DraftAds, newDraft], // add new
    };
  },

  // Delete a Draft by ID
  [types.deleteDraft]: (state, action) => {
    const draftId = action.payload;
    return {
      ...state,
      DraftAds: state.DraftAds.filter(d => d.id !== draftId),
    };
  },

  // Clear all drafts
  [types.clearDrafts]: () => initial_state,
};

export default function draftReducer(state = initial_state, action) {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
}
