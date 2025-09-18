import { types } from '../types';
import uuid from 'react-native-uuid';

const initial_state = {
  projectCopies: [], // will store objects
};

const actionMap = {
  // Add or Update Draft
  [types.createCopy]: (state, action) => {
    let projectCopies = action.payload;

    // If no id is provided → generate one
    if (!projectCopies.id) {
      projectCopies = { ...projectCopies, id: uuid.v4() };
    }

    // Check if draft with same id already exists → update
    const exists = state.projectCopies.find(d => d.id === projectCopies.id);

    return {
      ...state,
      projectCopies: exists
        ? state.projectCopies.map(d =>
            d.id === projectCopies.id ? { ...d, ...projectCopies } : d,
          )
        : [...state.projectCopies, projectCopies], // add new
    };
  },

  // Delete a Draft by ID
  [types.deleteCopy]: (state, action) => {
    const draftId = action.payload;
    return {
      ...state,
      projectCopies: state.projectCopies.filter(d => d.id !== draftId),
    };
  },

  // Clear all drafts
  [types.clearCopies]: () => initial_state,
};

export default function porjectCopy(state = initial_state, action) {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
}
