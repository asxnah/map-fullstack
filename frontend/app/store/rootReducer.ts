import { combineReducers } from '@reduxjs/toolkit';
import sourcesReducer from './slices/sourcesSlice';

export const rootReducer = combineReducers({
  sources: sourcesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
