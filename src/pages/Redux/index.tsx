import { AppDispatch, RootState, store } from '@/stores/redux';
import { globalActions } from '@/stores/redux/reducer/global';
import { useEffect, useState } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';

const ControllerGlobal: React.FC = () => {
  const global = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch<AppDispatch>();

  const [addCount, setAddCount] = useState(0);

  return (
    <>
      <div style={{ marginTop: 20 }}>ControllerGlobal</div>
      <div>{global.count}</div>
      <button onClick={() => dispatch(globalActions.add())}>+</button>
      <button onClick={() => dispatch(globalActions.sub())}>-</button>
      <div>
        <input type="number" value={addCount} onChange={(e) => setAddCount(Number(e.target.value))} />
        <button onClick={() => dispatch(globalActions.count(addCount))}>add</button>
      </div>
    </>
  );
};

const ControllerFetch: React.FC = () => {
  const global = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch<AppDispatch>();

  const [app, setApp] = useState('');

  const fetchPageData = () => {
    dispatch(globalActions.getApps({ app, pageNo: 1, pageSize: 5 }));
  };

  useEffect(() => {
    fetchPageData();
  }, [app]);

  return (
    <>
      <div style={{ marginTop: 20 }}>ControllerFetch</div>
      <input value={app} onChange={(e) => setApp(e.target.value)} />
      <button onClick={() => setApp('')}>clear</button>
      {global.pageData.items.map((item) => (
        <div key={item.id}>{item.appCode}</div>
      ))}
    </>
  );
};

const Redux: React.FC = () => {
  return (
    <Provider store={store}>
      <ControllerGlobal />
      <ControllerFetch />
    </Provider>
  );
};

export default Redux;
