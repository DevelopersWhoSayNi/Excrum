import React, { Component } from 'react';
import { Image } from 'semantic-ui-react';


class MemberCard extends Component {
  render() {
    return (
      <div>
        {/* {this.props.} */}
        <Image size="huge" src={this.props.userImage} />
      </div>
    );
  }
}

export default MemberCard;
