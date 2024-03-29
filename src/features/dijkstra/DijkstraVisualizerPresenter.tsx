import { ReactElement, useState } from 'react';
import type { Node as NodeType } from '../grid/Grid';
import Node from '../node/Node';
import {
  Flex,
  Text,
  Button,
  Modal,
  Paper,
  Space,
  Container,
} from '@mantine/core';

type Props = {
  grid: NodeType[][];
  handleMouseDown: (row: number, col: number) => void;
  handleMouseEnter: (row: number, col: number) => void;
  handleMouseUp: () => void;
  visualizeDijkstra: () => void;
  resetAlgorithm: () => void;
  isVisualizationStarted: boolean;
  currentNode: NodeType | null;
  visitedNodes: NodeType[];
  executionTime: number | null;
  isAnimationFinished: boolean;
};

function DijkstraVisualizerPresenter(props: Props): ReactElement {
  const [isModalOpened, setModalOpened] = useState(false);
  const {
    grid,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    visualizeDijkstra,
    resetAlgorithm,
    isVisualizationStarted,
    currentNode,
    executionTime,
    isAnimationFinished,
  } = props;
  return (
    <>
      <Container size="responsive">
        <Flex align="center" justify="center" direction="column">
          <Space h="xl" />
          <Flex align="center" justify="space-between" style={{ gap: '16px' }}>
            <Button
              variant="gradient"
              gradient={{ from: 'grape', to: 'violet', deg: 204 }}
              onClick={visualizeDijkstra}
            >
              Visualize Dijkstra Algorithm
            </Button>
            <Button
              color="red"
              onClick={resetAlgorithm}
              disabled={isVisualizationStarted || !isAnimationFinished}
            >
              Reset
            </Button>
            <Button color="indigo" onClick={(): void => setModalOpened(true)}>
              Rules
            </Button>
          </Flex>
          <Flex align="center" justify="center" style={{ marginTop: '16px' }}>
            <Text size="lg" style={{ marginRight: '16px' }}>
              Current Node:{' '}
              {currentNode ? `(${currentNode.row}, ${currentNode.col})` : 'N/A'}
            </Text>
            <Text size="lg">
              Execution Time:{' '}
              {isAnimationFinished && executionTime !== null
                ? `${executionTime.toFixed(2)} ms`
                : 'N/A'}
            </Text>
          </Flex>

          <Modal
            opened={isModalOpened}
            onClose={(): void => setModalOpened(false)}
          >
            <Paper style={{ maxWidth: '300px' }}>
              <Flex style={{ height: '100%' }}>
                <Text>Hold the mouse to draw walls on the grid.</Text>
              </Flex>
            </Paper>
          </Modal>
        </Flex>

        <Flex
          align="center"
          justify="center"
          direction="column"
          style={{ width: '100%', height: '100%', marginTop: '16px' }}
        >
          <div className="grid">
            {grid.map((row, rowIndex) => (
              <div className="node-wrapper" key={rowIndex}>
                {row.map((node, nodeIndex) => {
                  const { row, col, isStart, isFinish, isWall } = node;
                  return (
                    <Node
                      key={nodeIndex}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      onMouseDown={(r, c): void => handleMouseDown(r, c)}
                      onMouseEnter={(r, c): void => handleMouseEnter(r, c)}
                      onMouseUp={handleMouseUp}
                      row={row}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </Flex>
      </Container>
    </>
  );
}

export default DijkstraVisualizerPresenter;
