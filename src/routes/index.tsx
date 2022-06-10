import { RouteObject } from 'react-router-dom';

import LayoutApp from '~/pages/_layouts/App';
import LayoutDefault from '~/pages/_layouts/Default';

import Home from '~/pages/Home';
import Hook from '~/pages/Hook';
import HOC from '~/pages/HOC';

import NotFound from '~/pages/404';

// const Home = lazy(() => import('~/pages/Home'));
// const Hook = lazy(() => import('~/pages/Hook'));
// const HOC = lazy(() => import('~/pages/HOC'));
// const NotFound = lazy(() => import('~/pages/404'));

// const lazyLoad = (children: ReactNode): ReactNode => {
//   return <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>;
// };

const routes: RouteObject[] = [
  {
    path: '/',
    element: <LayoutApp />,
    children: [
      {
        path: '/home',
        element: <Home />,
        children: [
          { path: '/home/home', element: <Home /> },
          { path: '/home/hook', element: <Hook /> },
          { path: '/home/hoc', element: <HOC /> },
        ],
      },
      { path: '/hook', element: <Hook /> },
      { path: '/hoc', element: <HOC /> },
    ],
  },
  {
    path: '/default',
    element: <LayoutDefault />,
    children: [
      { path: '/default/home', element: <Home /> },
      { path: '/default/hook', element: <Hook /> },
      { path: '/default/hoc', element: <HOC /> },
    ],
  },
  { path: '*', element: <NotFound /> },
];

export default routes;
