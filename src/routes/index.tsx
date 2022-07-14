import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import type { RouteObject } from 'react-router-dom';

import Loading from '@/components/Loading';
import LayoutContainer from '@/pages/_layouts/Container';
import LayoutBlank from '@/pages/_layouts/Blank';

const Home = lazy(() => import('@/pages/Home'));
const Hook = lazy(() => import('@/pages/Hook'));
const HOC = lazy(() => import('@/pages/HOC'));
const Redux = lazy(() => import('@/pages/Redux'));
const Context = lazy(() => import('@/pages/Context'));
const EditableTable = lazy(() => import('@/pages/EditableTable'));

const NotFound = lazy(() => import('@/pages/404'));

const SetState = lazy(() => import('@/pages/_examples/SetState'));
const CSSBasis = lazy(() => import('@/pages/_examples/CSSBasis'));
const JavaScriptBasis = lazy(() => import('@/pages/_examples/JavaScriptBasis'));

const lazyLoad = (children: ReactNode): ReactNode => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <LayoutContainer />,
    children: [
      { path: '/Home', element: lazyLoad(<Home />) },
      { path: '/Hook', element: lazyLoad(<Hook />) },
      { path: '/HOC', element: lazyLoad(<HOC />) },
      { path: '/Redux', element: lazyLoad(<Redux />) },
      { path: '/Context', element: lazyLoad(<Context />) },
      { path: '/EditableTable', element: lazyLoad(<EditableTable />) },
    ],
  },
  {
    path: '/default',
    element: <LayoutBlank />,
    children: [
      { path: '/default/Home', element: lazyLoad(<Home />) },
      { path: '/default/Hook', element: lazyLoad(<Hook />) },
      { path: '/default/HOC', element: lazyLoad(<HOC />) },
      { path: '/default/Redux', element: lazyLoad(<Redux />) },
      { path: '/default/Context', element: lazyLoad(<Context />) },
      { path: '/default/EditableTable', element: lazyLoad(<EditableTable />) },
    ],
  },
  {
    path: '/example',
    element: <LayoutContainer />,
    children: [
      { path: '/example/SetState', element: lazyLoad(<SetState />) },
      { path: '/example/CSSBasis', element: lazyLoad(<CSSBasis />) },
      { path: '/example/JavaScriptBasis', element: lazyLoad(<JavaScriptBasis />) },
    ],
  },
  { path: '*', element: <NotFound /> },
];

export default routes;
