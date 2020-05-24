import React, { Component } from 'react';

import { graphql, compose } from 'react-apollo';
import QueryAllEvents from '../../graphql/QueryAllMembers';
import CreateNewMember from '../../graphql/CreateNewMember';

class AllEvents extends Component {
  state = {
    busy: false,
  };

  static defaultProps = {
    events: [],
    deleteEvent: () => null,
  };

  handleSync = async () => {
    const { client } = this.props;
    const query = QueryAllEvents;

    this.setState({ busy: true });

    await client.query({
      query,
      fetchPolicy: 'network-only',
    });

    this.setState({ busy: false });
  };

  renderEvent = (event) => (
    <div key={event.id}>
      <div>{event.id}</div>
      <div>{event.name}</div>
    </div>
  );

  addNewMember = () => {
    var newMemberVars = { name: 'New Member', group: 'Auto Add' };
    this.props.onAdd(newMemberVars);
  };

  render() {
    const { events } = this.props;
    console.log(events);

    return (
      <div>
        <div className="ui clearing basic segment">
          <h1 className="ui header left floated">All Events</h1>
        </div>
        <div className="ui link cards">
          {[].concat(events).map(this.renderEvent)}
        </div>
        <div>
          <button onClick={(e) => this.addNewMember()}>ADD</button>
        </div>
      </div>
    );
  }
}

const AllDestinationsWithData = compose(
  graphql(QueryAllEvents, {
    options: {
      fetchPolicy: 'cache-and-network',
    },
    props: (props) => ({
      events: props.data.listMembers,
    }),
  }),
  graphql(CreateNewMember, {
    props: (props) => ({
      onAdd: (member) =>
        props.mutate({
          variables: member,
          optimisticResponse: () => ({
            createMembers: {
              ...member,
              __typename: 'Member',
              version: 1,
            },
          }),
        }),
    }),
  })
)(AllEvents);

export default AllDestinationsWithData;
