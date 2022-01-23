import { React, Component } from 'react';
import './DijkstraVisualizer.css';
import Node from './Components/Node/Node';
import { dijkstra, getNodesInShortestPathOrder } from './algorithms/Dijkstra';

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
        const currNode = {
          col,
          row,
          isStart: row === 15 && col === 5,
          isFinish: row === 15 && col === 35,
        };
        currRow.push(currNode);
      }
      nodes.push(currRow);
    }
    this.setState({ nodes });
  }

  DijkstraVisualize() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodeOrdered = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijktra(visitedNodeOrdered, nodesInShortestPathOrder); // keep track of node for animations
  }

  render() {
    const { nodes } = this.state;

    return (
      <>
        <button onClick={() => this.DijkstraVisualize}>Vizualise</button>
        <div className='grid'>
          {nodes.map((row, rowIndex) => {
            return (
              <div className='node-wrapper' key={rowIndex}>
                {row.map((node, nodeIndex) => {
                  const { isStart, isFinish } = node;
                  return (
                    <Node
                      key={nodeIndex}
                      isStart={isStart}
                      isFinish={isFinish}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}
