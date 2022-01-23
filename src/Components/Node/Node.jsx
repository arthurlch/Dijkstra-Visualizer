import { React, Component } from 'react';
import './Node.css';

export default class Node extends Component {
  constructor(props) {
    super();
    this.state = {};
  }
  render() {
    const {
      isFinish,
      isStart,
      col,
      row,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
    } = this.props;

    const exClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : '';
    return (
      <div
        className={`node ${exClassName}`}
        id={`node ${row}-${col}`}
        onMouseDown={onMouseDown(row, col)}
        onMouseEnter={onMouseEnter(row, col)}
        onMouseUp={onMouseUp()}></div>
    );
  }
}
