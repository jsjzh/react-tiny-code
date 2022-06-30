import React, { useEffect } from 'react';

export const createLogComponent = (WrappedComponent: React.ComponentType) => {
  const LogComponent = () => {
    useEffect(() => {
      console.log('component mount');
      return () => {
        console.log('component unmount');
      };
    }, []);

    return <WrappedComponent />;
  };

  return LogComponent;
};

const HOCComponent: React.FC = () => {
  return <>HOCComponent</>;
};

export default createLogComponent(HOCComponent);
