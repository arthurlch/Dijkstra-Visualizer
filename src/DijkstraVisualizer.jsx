import { React, Component } from 'react';
// Styling
import './DijkstraVisualizer.css';
// CONSTANT DATA
import {
  START_NODE_COL,
  START_NODE_ROW,
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
} from './constant';
// Grid
import {
  getInitialGrid,
  createNode,
  getNewGridWithToggledWall,
} from './draw/DrawGrid';
// Node component
import Node from './Components/Node/Node';
// Algorithm
import { dijkstra, getNodesInShortestPathOrder } from './algorithms/Dijkstra';

export default class DijkstraVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: [],
      mouseIsPressed: false,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid(); // get and initial the basic grid
    this.setState({ grid });
  }

  // Eventing
  handleMouseDown(row, col) {
    const newGrid = getNewGridWithToggledWall(this.state.grid, row, col);
    this.setState({ grid: newGrid, mouseIsPressed: true });
  }
  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithToggledWall(this.state.grid, row, col);
    this.state({ grid: newGrid });
  }
  handdleMouseUp() {
    this.state({ mouseIsPressed: false });
  }

  // Dijkstra visual setup
  DijkstraVisualize() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodeOrdered = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijktra(visitedNodeOrdered, nodesInShortestPathOrder); // keep track of node for animations
  }

  // animateDijktra still not done ..

  animateDijktra(visitedNodeOrdered) {
    for (const node of visitedNodeOrdered) {
      const newGrid = this.state.grid.slice();
      const newNode = {
        ...node,
        isVisited: true,
      };
      newGrid[node.row][node.col] = newNode;
      setTimeout(() => {
        this.setState({ grid: newGrid });
      }, 100);
    }
  }

  render() {
    const { grid } = this.state;

    return (
      <>
        <button onClick={() => this.DijkstraVisualize()}>Vizualise</button>
        <div className='grid'>
          {grid.map((row, rowIndex) => {
            return (
              <div className='node-wrapper' key={rowIndex}>
                {row.map((node, nodeIndex) => {
                  const { isVisited, isStart, isFinish } = node;
                  return (
                    <Node
                      key={nodeIndex}
                      isStart={isStart}
                      isFinish={isFinish}
                      isVisited={isVisited}
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
