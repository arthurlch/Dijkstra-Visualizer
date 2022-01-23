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
import { getInitialGrid, getNewGridWithToggledWall } from './draw/DrawGrid';
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
    this.setState({ grid: newGrid });
  }

  handdleMouseUp() {
    this.setState({ mouseIsPressed: false });
  }

  // Dijkstra visual setup
  DijkstraVisualize() {
    const { grid } = this.state;
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL];
    const visitedNodeOrdered = dijkstra(grid, startNode, finishNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode);
    this.animateDijkstra(visitedNodeOrdered, nodesInShortestPathOrder); // keep track of node for animations
  }

  animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        document.getElementById(`node-${node.row}-${node.col}`).className =
          'node node-visited';
      }, 10 * i);
    }
  }

  shortPathAnimate() {} // define here

  render() {
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <button onClick={() => this.DijkstraVisualize()}>Vizualise</button>
        <div className='grid'>
          {grid.map((row, rowIndex) => {
            return (
              <div className='node-wrapper' key={rowIndex}>
                {row.map((node, nodeIndex) => {
                  const { row, col, isStart, isFinish, isWall } = node;
                  return (
                    <Node
                      key={nodeIndex}
                      isWall={isWall}
                      col={col}
                      row={row}
                      isStart={isStart}
                      isFinish={isFinish}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseUp={() => this.handdleMouseUp()}
                      onMouseEnter={(col, row) =>
                        this.handleMouseEnter(row, col)
                      }
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
