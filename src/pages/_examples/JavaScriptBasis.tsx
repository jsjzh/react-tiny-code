// @ts-nocheck
import { add } from 'lodash';
import React, { useEffect, useState } from 'react';

/**
 * 实现 call apply bind
 *
 * ----------------------------------------------------
 *
 * Instanceof 实现
 *
 * https://juejin.cn/post/6844903613584654344
 *
 * 可以判断某个实例是否属于某个类（或构造函数），或者是否属于这个类（或构造函数）的祖先类
 *
 * ----------------------------------------------------
 *
 * 原型链
 *
 * https://github.com/mqyqingfeng/Blog/issues/2
 *
 * ![原型链](https://camo.githubusercontent.com/9a69b0f03116884e80cf566f8542cf014a4dd043fce6ce030d615040461f4e5a/68747470733a2f2f63646e2e6a7364656c6976722e6e65742f67682f6d717971696e6766656e672f426c6f672f496d616765732f70726f746f74797065352e706e67)
 *
 * Person: 构造函数
 * person: 实例对象
 * Person.prototype: 实例原型
 * person.__proto__: 实例原型
 *
 * person.__proto__ === Person.prototype
 * Person.prototype.constructor === Person
 * Person.prototype.__proto__ === Object.prototype
 * Object.prototype.__proto__ === null
 *
 * ----------------------------------------------------
 *
 * JS 基本类型
 *
 * null undefined number string boolean object
 * symbol bigInt
 */

interface JavaScriptBasisProps {}

const examples = ['CallApplyBind', 'Instanceof', 'Prototype', 'BasisType', 'AddExample'];

const JavaScriptBasis: React.FC<JavaScriptBasisProps> = (props) => {
  const [example, setExample] = useState(() => localStorage.getItem('JavaScriptBasis:example') || examples[0]);

  const CallApplyBind = () => {
    console.log.call(null, 'CallApplyBind');
    console.log.apply(null, ['CallApplyBind']);
    console.log.bind(null)('CallApplyBind');
  };

  const Instanceof = () => {
    const customInstanceof = (proto, ex) => {
      let _ex = ex;
      while (true) {
        if (_ex === null) {
          return false;
        } else if (_ex === proto.prototype) {
          return true;
        }
        _ex = _ex.__proto__;
      }
    };

    class Parent {}
    class Child extends Parent {}
    const person = new Child();
    console.log(person instanceof Child);
    console.log(person instanceof Parent);
    console.log(customInstanceof(Parent, person));
  };

  const Prototype = () => {
    function Person() {}

    Person.prototype.name = 'king';

    const person = new Person();
    console.log(person.name);
    person.name = 'foo';
    console.log(person.name);
    console.log(person.__proto__ === Person.prototype);
    console.log(Person.prototype.constructor === Person);
    console.log(Person.prototype.__proto__ === Object.prototype);
    console.log(Object.prototype.__proto__ === null);
  };

  const BasisType = () => {
    console.log(typeof null);
    console.log(typeof undefined);
    console.log(typeof '');
    console.log(typeof 0);
    console.log(typeof true);
    console.log(typeof {});
    console.log(typeof Symbol());
    console.log(typeof BigInt(1));
  };

  const AddExample = () => {
    const add = (x, y, z) => x + y + z;

    const curry = (fn, ...args) =>
      args.length >= fn.length ? fn(...args) : (..._args) => curry(fn, ...args, ..._args);

    const CurryAdd = curry(add);

    console.log('result %d', CurryAdd(1)(2)(3));
    console.log('result %d', CurryAdd(1, 2, 3));
    console.log('result %d', CurryAdd(1, 2)(3));
    console.log('result %d', CurryAdd(1)(2, 3));
  };

  useEffect(() => {
    if (example === 'CallApplyBind') CallApplyBind();
    else if (example === 'Instanceof') Instanceof();
    else if (example === 'Prototype') Prototype();
    else if (example === 'BasisType') BasisType();
    else if (example === 'AddExample') AddExample();
  }, [example]);

  const handChange = (e) => {
    setExample(e.target.value);
    localStorage.setItem('JavaScriptBasis:example', e.target.value);
  };

  return (
    <>
      <div style={{ marginTop: 20 }}>JavaScriptBasis</div>

      <select value={example} onChange={handChange}>
        {examples.map((example) => (
          <option key={example} value={example}>
            {example}
          </option>
        ))}
      </select>
      <div style={{ marginLeft: 20, marginTop: 20 }}>{example}</div>
    </>
  );
};

export default JavaScriptBasis;
