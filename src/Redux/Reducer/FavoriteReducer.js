import { types } from '../types';

const initial_state = {
  favProjects: [],
};

const actionMap = {
  // Toggle project ID in favProjects array
  [types.toggleFavorite]: (state, action) => {
    const projectId = action.payload;
    const isFavorited = state.favProjects.includes(projectId);

    return {
      ...state,
      favProjects: isFavorited
        ? state.favProjects.filter(id => id !== projectId) // Remove if already favorited
        : [...state.favProjects, projectId], // Add if not favorited
    };
  },
  // Clear all favorite projects
  [types.clearFavorites]: () => initial_state,
};

export default function (state = initial_state, action) {
  const handler = actionMap[action.type];
  return handler ? handler(state, action) : state;
}
