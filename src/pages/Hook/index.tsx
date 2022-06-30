import { sleepSync } from '@/shared';
import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useMemo,
  useReducer,
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

const useLog = (componentName: string) => {
  useEffect(() => {
    console.log(`${componentName} component mount`);
    return () => {
      console.log(`${componentName} component unmount`);
    };
  }, []);
};

const UseState: React.FC = () => {
  const [state, setState] = useState(() => ({ name: 'king', age: 18 }));

  return (
    <>
      <div style={{ marginTop: 20 }}>UseState</div>
      <div>name: {state.name}</div>
      <div>age: {state.age}</div>
      <button onClick={() => setState((preState) => ({ ...preState, age: preState.age + 1 }))}>add</button>
    </>
  );
};

const UseEffect: React.FC = () => {
  const [state, setState] = useState(0);
  useLog('UseEffect');

  useEffect(() => {
    console.log('state change');
  }, [state]);

  return (
    <>
      <div style={{ marginTop: 20 }}>UseEffect</div>
      <div>state: {state}</div>
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
        <div style={{ marginTop: 20 }}>UseContext(from UseContext)</div>
        <button onClick={() => setState((preState) => ({ ...preState, age: preState.age + 1 }))}>add</button>

        <div>name: {context.name}</div>
        <div>age: {context.age}</div>

        <Context.Consumer>
          {(context) => (
            <>
              <div style={{ marginTop: 20 }}>UseContext(from Context.Consumer)</div>
              <div>name: {context.name}</div>
              <div>age: {context.age}</div>
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

  const callback = useCallback(() => {
    console.log(count1);
    // 若 count2 未变，则一直输出旧的 count1 值
  }, [count2]);

  useEffect(() => {
    console.log('counts changed');
  }, [callback]);

  return (
    <>
      <div style={{ marginTop: 20 }}>UseCallback</div>
      <div>count1: {count1}</div>
      <div>count2: {count2}</div>
      <button onClick={() => setCount1(count1 + 1)}>add count1</button>
      <button onClick={() => setCount2(count2 + 1)}>add count2</button>
      <button onClick={callback}>log callback's count1</button>
    </>
  );
};

const Child: React.FC<{ number: number }> = (props) => {
  console.log('rerender');
  sleepSync(500);
  return <div>number: {props.number}</div>;
};

const MemoChild = React.memo(Child);

const UseMemo: React.FC = () => {
  const [state, setState] = useState({ count: 0, number: 0 });

  return (
    <>
      <div style={{ marginTop: 20 }}>UseMemo</div>
      <div>count: {state.count}</div>
      <button onClick={() => setState((preState) => ({ ...preState, count: preState.count + 1 }))}>add count</button>
      <button onClick={() => setState((preState) => ({ ...preState, number: preState.number + 1 }))}>add number</button>
      <button onClick={() => setState((preState) => ({ ...preState, number: preState.number - 1 }))}>sub number</button>
      {/* <MemoChild number={state.number} /> */}
      {useMemo(
        () => (
          <Child number={state.number} />
        ),
        [state.number],
      )}
    </>
  );
};

const reducer = (state: number, action: { type: 'add' | 'sub' | 'set'; payload?: any }) => {
  switch (action.type) {
    case 'add':
      return state + 1;
    case 'sub':
      return state - 1;
    default:
      throw new Error(`unknown action type: ${action.type}`);
  }
};

const UseReducer: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, 0);

  return (
    <>
      <div style={{ marginTop: 20 }}>UseReducer</div>
      <div>state: {state}</div>
      <button onClick={() => dispatch({ type: 'add' })}>add</button>
      <button onClick={() => dispatch({ type: 'sub' })}>sub</button>
    </>
  );
};

const UseRef: React.FC = () => {
  const [state, setState] = useState(0);
  const ref = useRef(state);

  return (
    <>
      <div style={{ marginTop: 20 }}>UseRef</div>
      <div>state: {state}</div>
      <div>ref: {ref.current}</div>
      <button onClick={() => setState(state + 1)}>add</button>
      {/* 点击了 set ref 之后，再触发组件更新（click add）ref.current 才重新被渲染 */}
      <button onClick={() => (ref.current = state)}>set ref</button>
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
      <UseMemo />
      <UseReducer />
      <UseRef />
    </>
  );
};

export default Hook;
