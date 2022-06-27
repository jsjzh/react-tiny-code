import { RouteObject } from 'react-router-dom';

import LayoutContainer from '@/pages/_layouts/Container';
import LayoutBlank from '@/pages/_layouts/Blank';

import Home from '@/pages/Home';
import Hook from '@/pages/Hook';
// import HOC from '@/pages/HOC';

import NotFound from '@/pages/404';

// const Home = lazy(() => import('@/pages/Home'));
// const Hook = lazy(() => import('@/pages/Hook'));
// const HOC = lazy(() => import('@/pages/HOC'));
// const NotFound = lazy(() => import('@/pages/404'));

// const lazyLoad = (children: ReactNode): ReactNode => {
//   return <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>;
// };

const routes: RouteObject[] = [
  {
    path: '/',
    element: <LayoutContainer />,
    children: [
      { path: '/home', element: <Home /> },
      { path: '/hook', element: <Hook /> },
      // { path: '/hoc', element: <HOC /> },
    ],
  },
  {
    path: '/default',
    element: <LayoutBlank />,
    children: [
      { path: '/default/home', element: <Home /> },
      { path: '/default/hook', element: <Hook /> },
      // { path: '/default/hoc', element: <HOC /> },
    ],
  },
  { path: '*', element: <NotFound /> },
];

export default routes;
