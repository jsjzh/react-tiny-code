import { RouteObject } from 'react-router-dom';

import LayoutContainer from '@/pages/_layouts/Container';
import LayoutBlank from '@/pages/_layouts/Blank';

// import Home from '@/pages/Home';
// import Hook from '@/pages/Hook';
// import HOC from '@/pages/HOC';
// import NotFound from '@/pages/404';

import { lazy, Suspense } from 'react';
import type { ReactNode } from 'react';
import Loading from '@/components/Loading';

const Home = lazy(() => import('@/pages/Home'));
const Hook = lazy(() => import('@/pages/Hook'));
const HOC = lazy(() => import('@/pages/HOC'));
const Redux = lazy(() => import('@/pages/Redux'));

const NotFound = lazy(() => import('@/pages/404'));

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
    ],
  },
  // {
  //   path: '/default',
  //   element: <LayoutBlank />,
  //   children: [
  //     { path: '/default/home', element: lazyLoad(<Home />) },
  //     { path: '/default/hook', element: lazyLoad(<Hook />) },
  //     { path: '/default/hoc', element: lazyLoad(<HOC />) },
  //     { path: '/redux', element: lazyLoad(<Redux />) },
  //   ],
  // },
  { path: '*', element: <NotFound /> },
];

export default routes;
