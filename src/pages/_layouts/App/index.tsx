import React, { useRef } from 'react';
import { Link, Outlet, RouteObject } from 'react-router-dom';
import routes from '~/routes';
import './index.css';

const LayoutApp: React.FC = () => {
  const createMenu = (routes: RouteObject[]) => {
    return <ul>{routes.map(createMenuItem)}</ul>;
  };

  const createMenuItem = (route: RouteObject) => {
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
    <div className="app-container">
      <div className="app-menu">{createMenu(routes)}</div>
      <div className="app-context-container">
        {/* <div className="app-header">header</div> */}
        <div className="app-context">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutApp;
