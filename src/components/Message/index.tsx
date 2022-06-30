import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import './index.css';

interface MessageProps {
  message: string;
  timer?: number;
}

const Container = React.forwardRef((props: MessageProps, ref: React.ForwardedRef<HTMLDivElement>) => {
  const [show, setShow] = useState(true);

  let timer: any = null;

  useEffect(() => {
    timer = setTimeout(() => {
      setShow(false);
    }, props.timer || 1000);
    return () => {
      timer && clearTimeout(timer);
    };
  }, []);

  return show ? (
    <div ref={ref} className="customMessageContainer">
      <div>{props.message}</div>
    </div>
  ) : (
    <></>
  );
});

const Message: React.FC<MessageProps> = (props) => {
  return createPortal(<Container {...props} />, document.querySelector('body') as HTMLBodyElement);
};

export const message = (props: MessageProps) => {
  const $body = document.querySelector('body');
  const $div = document.createElement('div');
  $div.setAttribute('id', 'custom-message-box');
  $body?.appendChild($div);
  const root = createRoot($div);
  root.render(<Container {...props} />);
};

export default Message;
