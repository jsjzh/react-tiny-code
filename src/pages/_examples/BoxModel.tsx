import React from 'react';
import styled from 'styled-components';

/**
 * 问题描述：CSS 盒模型
 *
 * https://segmentfault.com/a/1190000013069516
 *
 * 标准盒模型（content-box） + IE 盒模型（border-box）
 *
 * Q: 什么是盒模型？
 * A: 盒模型又称框模型（Box Model），包含了元素内容（content）、内边距（padding）、边框（border）、外边距（margin）几个要素
 * ![image](https://upload-images.jianshu.io/upload_images/79178-12f8c9590705a099.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
 *
 * IE 盒模型 width = content + padding + border
 * 标准盒模型 width = content
 *
 * Q: js 如何设置获取盒模型对应的宽和高
 * A:
 * dom.style.width/height: 只能取到行内样式的宽高，style 标签中和 link 外链的样式取不到
 * dom.currentStyle.width/height: 取到最终渲染后的宽高，只有 IE 支持
 * window.getComputedStyle(dom).width/height: 取到最终渲染后的宽高
 * dom.getBoundingClientRect().width/height: 取到最终渲染后的宽高，除此之外还可以取到相对于视窗的上下左右的距离
 *
 * 外边距重叠：普通文档流中块的 margin 会重叠（取最大的），行内框、浮动框、绝对定位之间的外边距不会合并
 *
 * BFC：块级格式化上下文
 * BFC 决定了父元素如何对其子元素进行定位，以及与其他元素的关系和相互作用
 * BFC 的子元素边距会发生重叠，不同 BFC 边距不会发生重叠
 * BFC 区域不会与浮动元素布局重叠
 * Q: 如何创建 BFC？
 * A:
 * overflow 不为 visible
 * float 不为 none
 * position 不为 static 或 relative
 * display 为 inline-blocks table table-cell table-caption flex inline-flex
 */

interface BoxModelProps {}

const ContentBox = styled.div`
  box-sizing: content-box;
  width: 100px;
  height: 50px;
  padding: 10px;
  border: 5px solid red;
  margin: 15px;
`;

const BorderBox = styled.div`
  box-sizing: border-box;
  width: 100px;
  height: 50px;
  padding: 10px;
  border: 5px solid red;
  margin: 15px;
`;

const BFCP = styled.p`
  margin: 15px auto 25px;
  background: red;
`;

const BoxModel: React.FC<BoxModelProps> = (props) => {
  return (
    <>
      <div style={{ marginTop: 20 }}>BoxModel</div>
      <div style={{ marginLeft: 20 }}>
        <div style={{ marginTop: 20 }}>ContentBox</div>
        <ContentBox />
        {`width = content = 100px`}
        <div style={{ marginTop: 20 }}>BorderBox</div>
        <BorderBox />
        {`width = content + 2*padding + 2*border = 70px + 2*10px + 2*5px = 100px`}
      </div>

      <div style={{ marginLeft: 20 }}>
        <div style={{ marginTop: 20 }}>BFC</div>
        <div style={{ backgroundColor: 'pink' }}>
          <BFCP>1</BFCP>
          <div style={{ overflow: 'hidden', backgroundColor: 'blue' }}>
            <BFCP>2</BFCP>
          </div>
          <BFCP>3</BFCP>
          <BFCP>4</BFCP>
        </div>

        <div style={{ overflow: 'hidden' }}>
          <div style={{ width: 200, height: 200, backgroundColor: 'pink', float: 'left' }}>child</div>
          parent 父元素增加 overflow: 'hidden' 之后，就拥有了子元素的 height
        </div>
      </div>
    </>
  );
};

export default BoxModel;
