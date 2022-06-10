import React from 'react';
import { useRoutes } from 'react-router-dom';
import routes from '~/routes';

const Container: React.FC = () => useRoutes(routes);

export default Container;
