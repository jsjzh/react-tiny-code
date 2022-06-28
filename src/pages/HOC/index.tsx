import React, { useEffect } from 'react';

const createLogComponent = (WrappedComponent: React.ComponentType) => {
  const LogComponent: React.FC = (props) => {
    useEffect(() => {
      console.log('component mount');
      return () => {
        console.log('component unmount');
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  return () => <LogComponent />;
};

const HOCComponent: React.FC = () => {
  return <>HOCComponent</>;
};

export default createLogComponent(HOCComponent);
