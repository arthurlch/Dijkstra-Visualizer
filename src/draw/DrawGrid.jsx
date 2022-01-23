// Grid related fn and setup
import {
  START_NODE_COL,
  START_NODE_ROW,
  FINISH_NODE_ROW,
  FINISH_NODE_COL,
} from '../constant';

export const getInitialGrid = () => {
  const grid = [];
  let numberOfRow = 25;
  let numberOfColumn = 40;
  for (let row = 0; row < numberOfRow; row++) {
    const currRow = [];
    for (let col = 0; col < numberOfColumn; col++) {
      currRow.push(createNode(col, row));
    }
    grid.push(currRow);
  }
  return grid;
};

export const createNode = (col, row) => {
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

export const getNewGridWithToggledWall = (grid, row, col) => {
  const newGrid = grid.slice();
  const node = newGrid[row][col];
  const newNode = { ...node, isWall: !node.isWall };
  newGrid[row][col] = newNode;
  return newGrid;
};
