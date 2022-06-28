import { createAction, createReducer } from '@reduxjs/toolkit';

const namespace = 'globalBuilder';

const createType = (type: string) => `${namespace}/${type}`;

interface GlobalState {
  count: number;
}

const initialState: GlobalState = {
  count: 0,
};

const add = createAction(createType('add'));
const sub = createAction(createType('sub'));
const count = createAction<number>(createType('count'));

const globalBuilder = createReducer(initialState, (builder) => {
  builder
    .addCase(add, (state) => {
      state.count++;
    })
    .addCase(sub, (state) => {
      state.count--;
    })
    .addCase(count, (state, action) => {
      state.count += action.payload;
    });
});

export const globalBuilderActions = { add, sub, count };

export default globalBuilder;
