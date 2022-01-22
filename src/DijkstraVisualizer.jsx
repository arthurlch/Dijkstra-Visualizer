import { React, Component } from 'react';
import Node from './Components/Node/Node';
// clean commit
export default class DijkstraVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Node />
      </div>
    );
  }
}
