import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SourcesState {
  list: Source[];
}

const initialState: SourcesState = {
  list: [],
};

export const sourcesSlice = createSlice({
  name: 'sources',
  initialState,
  reducers: {
    addSource: (state, action: PayloadAction<Source>) => {
      state.list.push(action.payload);
    },
    editSource: (state, action: PayloadAction<Source>) => {
      state.list = state.list.map((source) =>
        source.id === action.payload.id ? action.payload : source
      );
    },
    deleteSource: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((source) => source.id !== action.payload);
    },
  },
});

export const { addSource, editSource, deleteSource } = sourcesSlice.actions;
export default sourcesSlice.reducer;
