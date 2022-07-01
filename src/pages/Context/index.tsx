import { sleepSync } from '@/shared';
import React, { PropsWithChildren, useContext, useEffect, useReducer } from 'react';
import { createLogComponent } from '../HOC';

interface GlobalState {
  count: number;
  text: string;
}

const globalState = {
  count: 0,
  text: 'hello',
};

const GlobalContext = React.createContext(globalState);

const globalReducer = (state: GlobalState, action: { type: 'add' | 'sub' | 'set'; payload?: any }) => {
  switch (action.type) {
    case 'add':
      return { ...state, count: state.count + 1 };
    case 'sub':
      return { ...state, count: state.count - 1 };
    case 'set':
      return { ...state, text: action.payload && action.payload.text };
    default:
      throw new Error(`unknown action type: ${action.type}`);
  }
};

const GlobalContextProvider: React.FC<PropsWithChildren> = (props) => {
  const [state, dispatch] = useReducer(globalReducer, globalState);

  return (
    <>
      <button onClick={() => dispatch({ type: 'add' })}>add</button>
      <GlobalContext.Provider value={state}>{props.children}</GlobalContext.Provider>
    </>
  );
};

const Count: React.FC = () => {
  const state = useContext(GlobalContext);

  return (
    <>
      <div style={{ marginTop: 20 }}>Count</div>
      <div>{state.count}</div>
    </>
  );
};

const SleepComponent: React.FC = () => {
  const state = useContext(GlobalContext);

  sleepSync(500);

  return (
    <>
      <div style={{ marginTop: 20 }}>SleepComponent</div>
      <div>{state.text}</div>
    </>
  );
};

const LogedCount = createLogComponent(Count);
const LogedSleepComponent = createLogComponent(SleepComponent);

const Context: React.FC = () => {
  return (
    <>
      <GlobalContextProvider>
        <LogedCount />
        <LogedSleepComponent />
      </GlobalContextProvider>
    </>
  );
};

export default Context;
