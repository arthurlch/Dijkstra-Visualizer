import { React, Component } from 'react';
import './DijkstraVisualizer.css';
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
    let numberOfRow = 25;
    let numberOfColumn = 40;
    for (let row = 0; row < numberOfRow; row++) {
      const currRow = [];
      for (let col = 0; col < numberOfColumn; col++) {
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
            <div className='node-wrapper'>
              {row.map((node, nodeIndex) => (
                <Node />
              ))}
            </div>
          );
        })}
      </div>
    );
  }
}
