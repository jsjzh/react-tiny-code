import React, { useEffect } from 'react';

export const createLogComponent = <P extends {}>(WrappedComponent: React.ComponentType<P>) => {
  const LogComponent = (props: P) => {
    useEffect(() => {
      console.log('component mount');
      return () => {
        console.log('component unmount');
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  return LogComponent;
};

const Component: React.FC<{ title: string }> = (props) => {
  return <>{props.title}</>;
};

const LogComponent = createLogComponent(Component);

export default () => {
  return <LogComponent title="hello world HOCComponent" />;
};
