import { mockAPI } from '@/services';
import { createNamespaceType } from '@/shared';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const namespace = 'global';

const createType = createNamespaceType(namespace);

const fetchData = createAsyncThunk(createType(mockAPI.fetchData.name), mockAPI.fetchData);

interface GlobalState {
  count: number;
  text: string;
  pageData: Mock.fetchData;
}

const initialState: GlobalState = {
  count: 0,
  text: 'hello world',
  pageData: {},
};

export const global = createSlice({
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
    reset: (state) => {
      state.count = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state, action) => {})
      .addCase(fetchData.fulfilled, (state, action) => {
        state.pageData = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {});
  },
});

export const globalActions = { ...global.actions, fetchData };

export default global.reducer;
