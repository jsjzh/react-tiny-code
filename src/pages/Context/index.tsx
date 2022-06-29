import React, { PropsWithChildren, useContext, useEffect, useReducer } from 'react';

interface GlobalState {
  count: number;
  text: string;
}

const globalState = {
  count: 0,
  text: 'hello',
};

const GlobalContext = React.createContext(globalState);

const globalReducer = (
  state: GlobalState,
  action: { type: 'add' | 'sub' | 'set'; payload: { [K: string]: any; text: string } },
) => {
  switch (action.type) {
    case 'add':
      return { ...state, count: state.count + 1 };
    case 'sub':
      return { ...state, count: state.count - 1 };
    case 'set':
      return { ...state, text: action.payload.text };
    default:
      throw new Error(`unknown action type: ${action.type}`);
  }
};

const GlobalContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [state, dispatch] = useReducer(globalReducer, globalState);

  return <GlobalContext.Provider value={[state, dispatch] as any}>{props.children}</GlobalContext.Provider>;
};

const Count: React.FC = () => {
  const [state, dispatch] = useContext(GlobalContext) as any;

  return (
    <>
      <div style={{ marginTop: 20 }}>Count</div>
      <div>{state.count}</div>
      <button onClick={() => dispatch({ type: 'add' })}>+</button>
      <button onClick={() => dispatch({ type: 'sub' })}>-</button>
    </>
  );
};

const Text: React.FC = () => {
  const [state, dispatch] = useContext(GlobalContext) as any;

  return (
    <>
      <div style={{ marginTop: 20 }}>Text</div>
      <div>{state.text}</div>
    </>
  );
};

const Context: React.FC = () => {
  return (
    <>
      <GlobalContextProvider>
        <div>
          <Count />
        </div>
        <div>
          <Text />
        </div>
      </GlobalContextProvider>
    </>
  );
};

export default Context;
