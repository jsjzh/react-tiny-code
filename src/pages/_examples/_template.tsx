import React, { useEffect } from 'react';

/**
 * 问题描述：${xxx}
 *
 * https://itwcqu2g6m.feishu.cn/base/bascnID5Lq7dDbVYnsvwzcoe5yh?table=tblIm88PeaEr2BWQ&view=vew0lbb2R4
 * https://github.com/jawil/blog/issues
 * https://github.com/justjavac/the-front-end-knowledge-you-may-not-know/issues?page=1&q=is%3Aissue+is%3Aopen
 * https://lxchuan12.gitee.io/
 */

interface _TemplateProps {}

const _Template: React.FC<_TemplateProps> = (props) => {
  useEffect(() => {
    console.log('_Template');
  }, []);

  return (
    <>
      <div style={{ marginTop: 20 }}>_Template</div>
      <div>_Template</div>
    </>
  );
};

export default _Template;
