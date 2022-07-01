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
      {/* 点击了 set ref 之后，再触发组件更新（click add）ref.current 才重新被渲染 */}
      <button onClick={() => (ref.current = state)}>set ref</button>
    </>
  );
};

// https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33fa94d873da42adae333219e9bbec87~tplv-k3u1fbpfcp-zoom-in-crop-mark:3024:0:0:0.awebp
const UseLayoutEffect: React.FC = () => {
  const [state, setState] = useState(0);

  /**
   * 此外，从 React 18 开始，当它是离散的用户输入（如点击）的结果时，或者当它是由 flushSync 包装的更新结果时，传递给 useEffect 的函数将在屏幕布局和绘制之前同步执行。这种行为便于事件系统或 flushSync 的调用者观察该效果的结果。
   * 注意
   * 这只影响传递给 useEffect 的函数被调用时 — 在这些 effect 中执行的更新仍会被推迟。这与 useLayoutEffect 不同，后者会立即启动该函数并处理其中的更新。
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
  //     // 这里有个很奇怪的点，就是最后一个 setState(5) 迟迟不更新到页面上
  //     // TODO 估计的去看看源码了，另外，上面的注释，应该就是这个的主要原因
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
