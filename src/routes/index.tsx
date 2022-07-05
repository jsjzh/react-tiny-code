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

const NotFound = lazy(() => import('@/pages/404'));

const SetState = lazy(() => import('@/pages/_examples/SetState'));
const BoxModel = lazy(() => import('@/pages/_examples/BoxModel'));

const lazyLoad = (children: ReactNode): ReactNode => {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
};

const routes: RouteObject[] = [
  {
    path: '/',
    element: <LayoutContainer />,
    children: [
      { path: '/home', element: lazyLoad(<Home />) },
      { path: '/hook', element: lazyLoad(<Hook />) },
      { path: '/hoc', element: lazyLoad(<HOC />) },
      { path: '/redux', element: lazyLoad(<Redux />) },
      { path: '/context', element: lazyLoad(<Context />) },
    ],
  },
  {
    path: '/default',
    element: <LayoutBlank />,
    children: [
      { path: '/default/home', element: lazyLoad(<Home />) },
      { path: '/default/hook', element: lazyLoad(<Hook />) },
      { path: '/default/hoc', element: lazyLoad(<HOC />) },
      { path: '/default/redux', element: lazyLoad(<Redux />) },
      { path: '/default/context', element: lazyLoad(<Context />) },
    ],
  },
  {
    path: '/example',
    element: <LayoutContainer />,
    children: [
      { path: '/example/SetState', element: lazyLoad(<SetState />) },
      { path: '/example/BoxModel', element: lazyLoad(<BoxModel />) },
    ],
  },
  { path: '*', element: <NotFound /> },
];

export default routes;
