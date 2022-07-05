import React from 'react';

/**
 * 问题描述：原型链
 *
 * https://github.com/mqyqingfeng/Blog/issues/2
 */

interface PrototypeProps {}

const Prototype: React.FC<PrototypeProps> = (props) => {
  return (
    <>
      <div style={{ marginTop: 20 }}>Prototype</div>
      <div>Prototype</div>
    </>
  );
};

export default Prototype;
