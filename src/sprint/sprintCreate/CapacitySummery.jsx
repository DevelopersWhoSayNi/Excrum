import React from 'react';

class CapacitySummery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h3>{this.props.title} :</h3>
        <h4>{this.props.value}</h4>
      </div>
    );
  }
}

export default CapacitySummery;
