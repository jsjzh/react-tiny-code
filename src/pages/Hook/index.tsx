import { sleepSync } from '@/shared';
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useReducer,
  useMemo,
  useRef,
  useLayoutEffect,
  useImperativeHandle,
  useDebugValue,
  // --------------------
  useId,
  useDeferredValue,
  useInsertionEffect,
  useSyncExternalStore,
  useTransition,
} from 'react';

const UseState: React.FC = () => {
  const [state, setState] = useState(() => ({ name: 'king', age: 18 }));

  return (
    <>
      <div style={{ marginTop: 20 }}>UseState</div>
      <div>{state.name}</div>
      <div>{state.age}</div>
      <button onClick={() => setState((preState) => ({ ...preState, age: preState.age + 1 }))}>add</button>
    </>
  );
};

const UseEffect: React.FC = () => {
  const [state, setState] = useState(0);

  useEffect(() => {
    console.log('component mount');
    return () => {
      console.log('component unmount');
    };
  }, []);

  useEffect(() => {
    console.log('state change');
  }, [state]);

  return (
    <>
      <div style={{ marginTop: 20 }}>UseEffect</div>
      <div>{state}</div>
      <button onClick={() => setState(state + 1)}>add</button>
    </>
  );
};

const UseContext: React.FC = () => {
  const initContext = { name: 'king', age: 18 };
  const Context = React.createContext(initContext);

  const [state, setState] = useState(initContext);

  const Child: React.FC = () => {
    const context = useContext(Context);

    return (
      <>
        <div style={{ marginTop: 20 }}>UseContext</div>
        <button onClick={() => setState((preState) => ({ ...preState, age: preState.age + 1 }))}>add</button>

        <div>{context.name}</div>
        <div>{context.age}</div>

        <Context.Consumer>
          {(context) => (
            <>
              <div style={{ marginTop: 20 }}>UseContext(from Context.Consumer)</div>
              <div>{context.name}</div>
              <div>{context.age}</div>
            </>
          )}
        </Context.Consumer>
      </>
    );
  };

  return (
    <>
      <Context.Provider value={state}>
        <Child />
      </Context.Provider>
    </>
  );
};

const UseCallback: React.FC = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  const callback = useCallback(() => {
    sleepSync(500);
    setCount1(count1 + 1);
  }, [count1]);

  return (
    <>
      <div style={{ marginTop: 20 }}>UseCallback</div>
      <div>count1: {count1}</div>
      <div>count2: {count2}</div>
      <div>count3: {count3}</div>
      <button onClick={callback}>add</button>
    </>
  );
};

const Hook: React.FC = () => {
  return (
    <>
      <UseState />
      <UseEffect />
      <UseContext />
      <UseCallback />
    </>
  );
};

export default Hook;
