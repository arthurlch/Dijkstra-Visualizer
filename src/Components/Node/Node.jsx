import { React, Component } from 'react';
import './Node.css';

export default class Node extends Component {
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

    const exClassName = isFinish // can be changed for type
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isWall
      ? 'node-wall'
      : '';
    return (
      <div
        id={`node-${row}-${col}`}
        className={`node ${exClassName}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}></div>
    );
  }
}
