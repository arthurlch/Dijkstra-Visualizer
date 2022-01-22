import { React, Component } from 'react';
import Node from './Components/Node/Node';

export default class DijkstraVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodes: [],
    };
  }

  componentDidMount() {
    // draw the grid
    const nodes = [];
    for (let row = 0; row < 15; row++) {
      const currRow = [];
      for (let col = 0; col < 40; col++) {
        currRow.push([]);
      }
      nodes.push(currRow);
    }
    this.setState({ nodes });
  }

  render() {
    const { nodes } = this.state;

    return (
      <div className='grid'>
        {nodes.map((row, rowIndex) => {
          return (
            <div className={rowIndex}>
              {row.map((node, nodeIndex) => (
                <Node></Node>
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}
