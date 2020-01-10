import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <Segment>{this.props.task.description}</Segment>;
  }
}

export default Task;
