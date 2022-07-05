// @ts-nocheck
import React, { useEffect } from 'react';

/**
 * 问题描述：Instanceof 实现
 *
 * 可以判断某个实例是否属于某个类（或构造函数），或者是否属于这个类（或构造函数）的祖先类
 */

const customInstanceof = (proto, ex) => {
  let _proto = ex;
  while (true) {
    if (_proto === null) {
      return false;
    } else if (_proto === proto.prototype) {
      return true;
    }
    _proto = _proto.__proto__;
  }
};

interface InstanceofProps {}

const Instanceof: React.FC<InstanceofProps> = (props) => {
  useEffect(() => {
    class Parent {}
    class Child extends Parent {}

    const person = new Child();

    console.log(person instanceof Child);
    console.log(person instanceof Parent);

    console.log(customInstanceof(Parent, person));
  }, []);

  return (
    <>
      <div style={{ marginTop: 20 }}>Instanceof</div>
      <div>Instanceof</div>
    </>
  );
};

export default Instanceof;
