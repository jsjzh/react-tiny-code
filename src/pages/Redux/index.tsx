import { sleepSync } from '@/shared';
import { AppDispatch, RootState, store } from '@/stores/redux';
import { globalActions } from '@/stores/redux/reducer/global';
import _ from 'lodash';
import moment from 'moment';
import { useEffect, useMemo, useState } from 'react';
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
        <button onClick={() => dispatch(globalActions.reset())}>reset</button>
      </div>
    </>
  );
};

const SleepComponent: React.FC = () => {
  const global = useSelector((state: RootState) => state.global);

  const text = useMemo(() => {
    sleepSync(500);
    return global.text;
  }, [global.text]);

  return (
    <>
      <div style={{ marginTop: 20 }}>SleepComponent</div>
      <div>{text}</div>
    </>
  );
};

const ControllerFetch: React.FC = () => {
  const global = useSelector((state: RootState) => state.global);
  const dispatch = useDispatch<AppDispatch>();

  const [query, setQuery] = useState('react');

  useEffect(() => {
    const _fetchPageData = () => {
      dispatch(globalActions.fetchData({ query }));
    };

    const fetchPageData = _.debounce(_fetchPageData, 500);

    fetchPageData();
    return () => {
      fetchPageData.cancel();
    };
  }, [query]);

  return (
    <>
      <div style={{ marginTop: 20 }}>ControllerFetch</div>
      <div>{moment().format('YYYY-MM-DD HH:mm:ss:SSS')}</div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <button onClick={() => setQuery('')}>clear</button>
      <div>{JSON.stringify(global.pageData)}</div>
    </>
  );
};

const Redux: React.FC = () => {
  return (
    <Provider store={store}>
      <SleepComponent />
      <ControllerGlobal />
      <ControllerFetch />
    </Provider>
  );
};

export default Redux;
