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
    // ??? count2 ?????????????????????????????? count1 ???
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
  sleepSync(500);
  const ref = useRef(0);
  return (
    <>
      <div>number: {props.number}</div>
      <div>rerender count: {ref.current++}</div>
    </>
  );
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
      <MemoChild number={state.number} />
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
      {/* ????????? set ref ?????????????????????????????????click add???ref.current ?????????????????? */}
      <button onClick={() => (ref.current = state)}>set ref</button>
    </>
  );
};

// https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33fa94d873da42adae333219e9bbec87~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp
const UseLayoutEffect: React.FC = () => {
  const [state, setState] = useState(0);

  /**
   * ???????????? React 18 ??????????????????????????????????????????????????????????????????????????????????????? flushSync ???????????????????????????????????? useEffect ?????????????????????????????????????????????????????????????????????????????????????????? flushSync ???????????????????????????????????????
   * ??????
   * ????????????????????? useEffect ????????????????????? ??? ????????? effect ?????????????????????????????????????????? useLayoutEffect ??????????????????????????????????????????????????????????????????
   */
  // useEffect(() => {
  //   if (state === 1) {
  //     sleepSync(500);
  //     setState(2);
  //   } else if (state === 2) {
  //     sleepSync(500);
  //     setState(3);
  //   } else if (state === 3) {
  //     sleepSync(500);
  //     setState(4);
  //   } else if (state === 4) {
  //     sleepSync(500);
  //     setState(5);
  //     // ???????????????????????????????????????????????? setState(5) ???????????????????????????
  //     // TODO ??????????????????????????????????????????????????????????????????????????????????????????
  //   } else if (state === 5) {
  //     sleepSync(2000);
  //     setState(6);
  //   }
  // }, [state]);

  useLayoutEffect(() => {
    if (state === 1) {
      sleepSync(500);
      setState(2);
    } else if (state === 2) {
      sleepSync(500);
      setState(3);
    } else if (state === 3) {
      sleepSync(500);
      setState(4);
    } else if (state === 4) {
      sleepSync(500);
      setState(5);
    } else if (state === 5) {
      sleepSync(500);
      setState(6);
    }
  }, [state]);

  return (
    <>
      <div style={{ marginTop: 20 }}>UseLayoutEffect</div>
      <div>state: {state}</div>
      <button onClick={() => setState(state + 1)}>add</button>
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
      <UseLayoutEffect />
    </>
  );
};

export default Hook;
