import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SourcesState {
  list: Source[];
}

const initialState: SourcesState = {
  list: [],
};

export const sourcesSlice = createSlice({
  name: "sources",
  initialState,
  reducers: {
    set: (state, action: PayloadAction<Source[]>) => {
      state.list = action.payload;
    },
    add: (state, action: PayloadAction<Source>) => {
      state.list.push(action.payload);
    },
    update: (state, action: PayloadAction<Source>) => {
      state.list = state.list.map((source) =>
        source.id === action.payload.id ? action.payload : source
      );
    },
    remove: (state, action: PayloadAction<string>) => {
      state.list = state.list.filter((source) => source.id !== action.payload);
    },
  },
});

export const { set, add, update, remove } = sourcesSlice.actions;
export default sourcesSlice.reducer;
