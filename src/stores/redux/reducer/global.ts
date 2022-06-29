import { mockAPI } from '@/services';
import { createNamespaceType } from '@/shared';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

const namespace = 'global';

const createType = createNamespaceType(namespace);

const getApps = createAsyncThunk(createType(mockAPI.getApps.name), mockAPI.getApps);

interface GlobalState {
  count: number;
  pageData: Mock.getApps;
}

const initialState: GlobalState = {
  count: 0,
  pageData: {
    items: [],
    pageNo: 0,
    pageSize: 0,
    totalPage: 0,
    totalSize: 0,
  },
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
      .addCase(getApps.pending, (state, action) => {})
      .addCase(getApps.fulfilled, (state, action) => {
        state.pageData = action.payload;
      })
      .addCase(getApps.rejected, (state, action) => {});
  },
});

export const globalActions = { ...global.actions, getApps };

export default global.reducer;
