import { React, Component } from 'react';
import './Node.css';

export default class Node extends Component {
  constructor(props) {
    super();
    this.state = {};
  }
  render() {
    const { isFinish, isStart } = this.props;
    const exClassName = isFinish ? 'node-end' : isStart ? 'node-start' : '';
    return <div className={`node ${exClassName}`}></div>;
  }
}
