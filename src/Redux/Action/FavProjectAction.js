import { types } from '../types';

export const favProject = payload => ({
  type: types.toggleFavorite,
  payload,
});

export const clearFavProject = () => ({
  type: types.clearFavorites,
});
