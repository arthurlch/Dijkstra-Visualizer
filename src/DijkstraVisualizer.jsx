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
    const { grid, mouseIsPressed } = this.state;

    return (
      <>
        <button onClick={() => this.DijkstraVisualize}>Vizualise</button>
        <div className='grid'>
          {grid.map((row, rowIndex) => {
            return (
              <div className='node-wrapper' key={rowIndex}>
                {row.map((node, nodeIndex) => {
                  const { row, col, isWall, isStart, isFinish } = node;
                  return (
                    <Node
                      key={nodeIndex}
                      isStart={isStart}
                      isFinish={isFinish}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      col={col}
                      row={row}
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

const getInitialGrid = () => {
  const grid = [];
  let numberOfRow = 25;
  let numberOfColumn = 40;
  for (let row = 0; row < numberOfRow; row++) {
    const currRow = [];
    for (let col = 0; col < numberOfColumn; col++) {
      currRow.push(createNode(col, row));
    }
    grid.push(currNode);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity, // have to define distance that cannot be reach,
    isVisited: false,
    isWall: false,
    previousNode: null,
  };
};

const getNewGridWithToggledWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid([row][col]);
  const newNode = { ...node, isWall: !node.isWall };
  newGrid[row][col] = newNode;
  return newGrid;
};
