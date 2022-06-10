import React from 'react';
import { Link, Outlet, RouteObject } from 'react-router-dom';
import routes from '~/routes';

const LayoutApp: React.FC = () => {
  const createMenu = (routes: RouteObject[]) => {
    return <ul>{routes.map(createLinkItem)}</ul>;
  };

  const createLinkItem = (route: RouteObject) => {
    return (
      <li key={route.path}>
        <Link key={route.path} to={route.path as string}>
          {route.path}
        </Link>
        {Array.isArray(route.children) && createMenu(route.children as RouteObject[])}
      </li>
    );
  };

  return (
    <>
      {createMenu(routes)}
      <Outlet />
    </>
  );
};

export default LayoutApp;
