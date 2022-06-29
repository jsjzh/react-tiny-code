import {
  AnyAction,
  CaseReducer,
  createAction,
  createReducer,
  createSlice,
  PayloadAction,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
} from '@reduxjs/toolkit';

function isNumberValueAction(action: AnyAction): action is PayloadAction<{ value: number }> {
  return typeof action.payload.value === 'number';
}

createReducer({ value: 0 }, (builder) =>
  builder.addMatcher(isNumberValueAction, (state, action) => {
    state.value += action.payload.value;
  }),
);

//

function withPayloadType<T>() {
  return (t: T) => ({ payload: t });
}

createAction('test', withPayloadType<string>());

//

const increment = createAction<number, 'increment'>('increment');
const decrement = createAction<number, 'decrement'>('decrement');

createReducer(0, {
  [increment.type]: (state, action) => {
    // action is any here
  },
  [decrement.type]: (state, action: PayloadAction<string>) => {
    // even though action should actually be PayloadAction<number>, TypeScript can't detect that and won't give a warning here.
  },
});

type State = number;

const increment2: CaseReducer<State, PayloadAction<number>> = (state, action) => state + action.payload;

createSlice({
  name: 'test',
  initialState: 0,
  reducers: {
    increment2,
  },
});

//

const blogSlice = createSlice({
  name: 'blogData',
  initialState: { all: [], meta: { currentPage: 0 } },
  reducers: {
    receivedAll: {
      reducer(state, action: PayloadAction<any[], string, { currentPage: number }>) {
        state.all = action.payload;
        state.meta = action.meta;
      },
      prepare(payload: any[], currentPage: number) {
        return { payload, meta: { currentPage } };
      },
    },
  },
});

//

interface GenericState<T> {
  data?: T;
  status: 'loading' | 'finished' | 'error';
}

const createGenericSlice = <T, Reducers extends SliceCaseReducers<GenericState<T>>>({
  name = '',
  initialState,
  reducers,
}: {
  name: string;
  initialState: GenericState<T>;
  reducers: ValidateSliceCaseReducers<GenericState<T>, Reducers>;
}) => {
  return createSlice({
    name,
    initialState,
    reducers: {
      start(state) {
        state.status = 'loading';
      },
      /**
       * If you want to write to values of the state that depend on the generic
       * (in this case: `state.data`, which is T), you might need to specify the
       * State type manually here, as it defaults to `Draft<GenericState<T>>`,
       * which can sometimes be problematic with yet-unresolved generics.
       * This is a general problem when working with immer's Draft type and generics.
       */
      success(state: GenericState<T>, action: PayloadAction<T>) {
        state.data = action.payload;
        state.status = 'finished';
      },
      ...reducers,
    },
  });
};

const wrappedSlice = createGenericSlice({
  name: 'test',
  initialState: { status: 'loading' } as GenericState<string>,
  reducers: {
    magic(state) {
      state.status = 'finished';
      state.data = 'hocus pocus';
    },
  },
});
