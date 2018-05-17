// Flow does not work for this file until support for createRef is added
import React from 'react';
import messageStyles from './style.css';

type MessagePropsType = {
  id: string,
  message: string,
  onMount: (offset: number) => {},
  wrapperDiv: HTMLDivElement,
};

class Message extends React.Component<MessagePropsType> {
  constructor (props: MessagePropsType) {
    super(props);
    this.wrapperDiv = React.createRef();
  }

  componentDidMount () {
    if (this.props.neverRendered) {
      const el = this.wrapperDiv.current;
      const { onMount } = this.props;
      let { height } = el.getBoundingClientRect();
      height += parseInt(window.getComputedStyle(el)['margin-top'], 10);
      height += parseInt(window.getComputedStyle(el)['margin-bottom'], 10);
      onMount(-height, this.props.id);
    }
  }

  render () {
    const { id, message } = this.props;
    return (
      <div ref={this.wrapperDiv} id={id} className={messageStyles.wrapper}>
        <div className={messageStyles.icon}>B</div>
        <div className={messageStyles.body}>
          <strong className={messageStyles.name}>Billy Bob</strong>
          <span className={messageStyles.role}>Host</span>
          <div className={messageStyles.message}>{message}</div>
        </div>
      </div>
    );
  }
}


export default Message;
