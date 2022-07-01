import React from 'react';

/**
 * 问题描述：${xxx}
 *
 * https://zhuanlan.zhihu.com/p/350332132
 *
 * TLDR
 * 只要你进入了 react 的调度流程，那就是异步的。
 * 只要你没有进入 react 的调度流程，那就是同步的。
 * 什么东西不会进入 react 的调度流程？
 * setTimeout setInterval，直接在 DOM 上绑定原生事件等。这些都不会走 React 的调度流程。
 * 你在这种情况下调用 setState，那这次 setState 就是同步的。否则就是异步的。
 * 而 setState 同步执行的情况下，DOM 也会被同步更新，也就意味着如果你多次 setState，会导致多次更新，这是毫无意义并且浪费性能的。
 */

interface SetStateProps {}

interface SetStateState {
  data: string;
}

class SetState extends React.Component<SetStateProps, SetStateState> {
  constructor(props: SetStateProps) {
    super(props);
    this.state = {
      data: 'data',
    };
  }

  componentDidMount() {
    this.setState({
      data: 'did mount state',
    });

    console.log('did mount state ', this.state.data);
    // did mount state data

    setTimeout(() => {
      this.setState({
        data: 'setTimeout',
      });

      console.log('setTimeout ', this.state.data);
    });
  }

  render() {
    return <>SetState</>;
  }
}

export default SetState;
