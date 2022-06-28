import React from 'react';
import { Link, Outlet, RouteObject } from 'react-router-dom';
import routes from '@/routes';
import './index.css';

const createMenu = (routes: RouteObject[]) => {
  return <div>{routes.map(createMenuItem)}</div>;
};

const createMenuItem = (route: RouteObject) => {
  return (
    <div style={{ paddingLeft: 20 }} key={route.path}>
      <Link key={route.path} to={route.path as string}>
        {route.path}
      </Link>
      {Array.isArray(route.children) && createMenu(route.children)}
    </div>
  );
};

const LayoutContainer: React.FC = () => {
  return (
    <div className="container">
      <div className="side">
        <div className="logo">LOGO</div>
        {createMenu(routes)}
      </div>
      <div className="content">
        <div className="header">header</div>
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutContainer;
