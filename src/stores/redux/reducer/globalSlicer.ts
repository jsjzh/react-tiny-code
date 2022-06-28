import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const namespace = 'globalSlicer';

interface GlobalState {
  count: number;
}

const initialState: GlobalState = {
  count: 0,
};

export const globalSlicer = createSlice({
  name: namespace,
  initialState,
  reducers: {
    add: (state) => {
      state.count++;
    },
    sub: (state) => {
      state.count--;
    },
    count: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
  },
});

export const globalSlicerActions = globalSlicer.actions;

export default globalSlicer.reducer;
