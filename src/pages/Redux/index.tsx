import { AppDispatch, RootState, store } from '@/stores/redux';
import { globalBuilderActions } from '@/stores/redux/reducer/globalBuilder';
import { globalSlicerActions } from '@/stores/redux/reducer/globalSlicer';
import { useState } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';

const ControllerBuilder: React.FC = () => {
  const count = useSelector((state: RootState) => state.globalBuilder.count);
  const dispatch = useDispatch<AppDispatch>();

  const [addCount, setAddCount] = useState(0);

  return (
    <>
      <div style={{ marginTop: 20 }}>ControllerBuilder</div>
      <div>{count}</div>
      <button onClick={() => dispatch(globalBuilderActions.add())}>+</button>
      <button onClick={() => dispatch(globalBuilderActions.sub())}>-</button>
      <div>
        <input type="number" value={addCount} onChange={(e) => setAddCount(Number(e.target.value))} />
        <button onClick={() => dispatch(globalBuilderActions.count(addCount))}>add</button>
      </div>
    </>
  );
};

const ControllerSlicer: React.FC = () => {
  const count = useSelector((state: RootState) => state.globalSlicer.count);
  const dispatch = useDispatch<AppDispatch>();

  const [addCount, setAddCount] = useState(0);

  return (
    <>
      <div style={{ marginTop: 20 }}>ControllerSlicer</div>
      <div>{count}</div>
      <button onClick={() => dispatch(globalSlicerActions.add())}>+</button>
      <button onClick={() => dispatch(globalSlicerActions.sub())}>-</button>
      <div>
        <input type="number" value={addCount} onChange={(e) => setAddCount(Number(e.target.value))} />
        <button onClick={() => dispatch(globalSlicerActions.count(addCount))}>add</button>
      </div>
    </>
  );
};

const Redux: React.FC = () => {
  return (
    <Provider store={store}>
      <ControllerBuilder />
      <ControllerSlicer />
    </Provider>
  );
};

export default Redux;
