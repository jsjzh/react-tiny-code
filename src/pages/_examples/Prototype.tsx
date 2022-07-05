// @ts-nocheck
import React, { useEffect } from 'react';

/**
 * 问题描述：原型链
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
 */

interface PrototypeProps {}

const Prototype: React.FC<PrototypeProps> = (props) => {
  useEffect(() => {
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
  }, []);

  return (
    <>
      <div style={{ marginTop: 20 }}>Prototype</div>
      <div>Prototype</div>
    </>
  );
};

export default Prototype;
