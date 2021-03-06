import React, { Component } from 'react';
import {
  Button,
  Message,
  Dimmer,
  Loader,
  Segment,
  Input,
  List,
} from 'semantic-ui-react';
import CreateSprint from '../../api/CreateSprint';
import GetTeamSprintStats from '../../api/GetSprints';
import UpdateLastSprintDetails from '../../api/UpdateSprintDetails';

//TODO: create a class 'reactive', that pushes state change 'with API call result in it' as props to TaskForm
// import { RemoveMembersPhoto } from '../Tools';

const Empty_Sprint_Capacity = {
  capacityHours: 0,
  effortsAdded: 0,
  effortsDelivered: 0,
  effortsPlanned: 0,
  effortsSuggested: 0,
};
class SprintSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newSprintData: this.props.sprintData,
      lastSprintData: null,
      sprintCreatedBanner: true,
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    GetTeamSprintStats(
      'GetSprintBySprintID',
      this.props.sprintData.lastSprintId
    ).then((res) => {
      if (res === null) {
        this.setState({
          loading: false,
        });
      } else {
        ///
        this.setState({
          loading: false,
          lastSprintData: res,
        });
      }
    });
  }

  createSprint() {
    this.setState({ loading: true });
    CreateSprint(this.state.newSprintData).then(() => {
      this.setState({ sprintCreatedBanner: false, loading: false });
    });
    UpdateLastSprintDetails(this.state.lastSprintData);
  }

  getSuggestedEffort(newCapacityHours, lastCapacityHours, effortsDelivered) {
    // if (lastSprintCapacityDetail === null) {
    //   return 'Suggestions requires more data from previous sprints';
    // } else
    if (effortsDelivered === null || effortsDelivered === 0) {
      return 'Please fill in efforts delivered in last Sprint';
    } else {
      return (
        (parseInt(effortsDelivered) / parseInt(lastCapacityHours)) *
        parseInt(newCapacityHours)
      ).toFixed(1);
    }
  }

  handleEffortsDeliveredChanges = (
    value,
    newSprintCapacityDetail,
    lastCapacityHours
  ) => {
    const lastCapacityDetails = this.state.lastSprintData.capacityDetails;
    for (let index = 0; index < lastCapacityDetails.length; index++) {
      if (
        lastCapacityDetails[index].groupName ===
        newSprintCapacityDetail.groupName
      ) {
        lastCapacityDetails[index].effortsDelivered = value;
        break;
      }
    }

    const lastSprintStateDetails = {
      ...this.state.lastSprintData,
      capacityDetails: lastCapacityDetails,
    };

    const suggestedEffort = this.getSuggestedEffort(
      newSprintCapacityDetail.capacityHours,
      lastCapacityHours,
      value
    );

    const newCapacityDetails = this.state.newSprintData.capacityDetails;
    for (let index = 0; index < newCapacityDetails.length; index++) {
      if (
        newCapacityDetails[index].groupName ===
        newSprintCapacityDetail.groupName
      ) {
        newCapacityDetails[index].effortsSuggested = suggestedEffort;
        break;
      }
    }

    const newSprintStateDetails = {
      ...this.state.newSprintData,
      capacityDetails: newCapacityDetails,
    };

    this.setState({
      newSprintData: newSprintStateDetails,
      lastSprintData: lastSprintStateDetails,
    });
  };

  handleNewSprintCapacityChanges = (value, variable, groupName) => {
    const newCapacityDetails = this.state.newSprintData.capacityDetails;
    for (let index = 0; index < newCapacityDetails.length; index++) {
      if (newCapacityDetails[index].groupName === groupName) {
        newCapacityDetails[index][variable] = value;
        break;
      }
    }

    const newSprintStateDetails = {
      ...this.state.newSprintData,
      capacityDetails: newCapacityDetails,
    };

    this.setState({ newSprintData: newSprintStateDetails });
  };

  handleLastSprintCapacityChanges = (value, variable, groupName) => {
    const lastCapacityDetails = this.state.lastSprintData.capacityDetails;
    for (let index = 0; index < lastCapacityDetails.length; index++) {
      if (lastCapacityDetails[index].groupName === groupName) {
        lastCapacityDetails[index][variable] = value;
        break;
      }
    }

    const lastSprintStateDetails = {
      ...this.state.lastSprintData,
      capacityDetails: lastCapacityDetails,
    };

    this.setState({ lastSprintData: lastSprintStateDetails });
  };

  getLastSprintCapacityDetail(groupName) {
    if (this.state.lastSprintData === null) {
      return null;
    }

    var LastSprintCapacity = this.state.lastSprintData.capacityDetails.find(
      (g) => g.groupName === groupName
    );

    if (
      typeof LastSprintCapacity !== 'undefined' &&
      LastSprintCapacity !== null
    ) {
      return LastSprintCapacity;
    } else {
      Empty_Sprint_Capacity.groupName = groupName;
      return Empty_Sprint_Capacity;
    }
  }

  //#TODO move out
  renderCapacitySummaries() {
    return this.state.newSprintData.capacityDetails.map(
      (newSprintCapacityDetail, index) => {
        const lastSprintCapacityDetail = this.getLastSprintCapacityDetail(
          newSprintCapacityDetail.groupName
        );
        return (
          <List.Item key={index}>
            {this.renderCapacitySummary(
              newSprintCapacityDetail,
              lastSprintCapacityDetail
            )}
          </List.Item>
        );
      }
    );
  }

  //#TODO move-out
  renderCapacitySummary(newSprintCapacityDetail, lastSprintCapacityDetail) {
    // this.getSuggestedEffort(newSprintCapacityDetail, lastSprintCapacityDetail);
    return (
      <Segment>
        <h3>{newSprintCapacityDetail.groupName}</h3>
        {this.state.lastSprintData ? (
          <Segment className="SprintSummaryBlocks">
            <h2>Last sprint: {this.state.lastSprintData.sprintNumber}</h2>
            <h4>Capacity: {lastSprintCapacityDetail.capacityHours}</h4>
            <h4>
              Suggested Effort: {lastSprintCapacityDetail.effortsSuggested}
            </h4>
            <h4>Effort Planned: {lastSprintCapacityDetail.effortsPlanned}</h4>
            <h4 className="Rows">
              <p className="InputText">Efforts Added:</p>
              <Input
                className="InputBox"
                fluid
                placeholder={lastSprintCapacityDetail.effortsAdded}
                onChange={(e) =>
                  this.handleLastSprintCapacityChanges(
                    e.target.value,
                    'effortsAdded',
                    newSprintCapacityDetail.groupName
                  )
                }
              />
            </h4>
            <br />
            <h4 className="Rows">
              <p className="InputText">Efforts Delivered:</p>
              <Input
                className="InputBox"
                fluid
                placeholder={lastSprintCapacityDetail.effortsDelivered}
                onChange={(e) =>
                  this.handleEffortsDeliveredChanges(
                    e.target.value,
                    newSprintCapacityDetail,
                    lastSprintCapacityDetail.capacityHours
                  )
                }
              />
            </h4>
          </Segment>
        ) : null}

        <Segment className="SprintSummaryBlocks">
          <h2>New sprint: {this.state.newSprintData.sprintNumber}</h2>
          <h4>Capacity: {newSprintCapacityDetail.capacityHours}</h4>
          <h4>Suggested Effort: {newSprintCapacityDetail.effortsSuggested}</h4>
          <h4 className="Rows">
            <p className="InputText">Effort Planned:</p>
            <Input
              className="InputBox"
              fluid
              placeholder={newSprintCapacityDetail.effortsPlanned}
              onChange={(e) =>
                this.handleNewSprintCapacityChanges(
                  e.target.value,
                  'effortsPlanned',
                  newSprintCapacityDetail.groupName
                )
              }
            />
          </h4>
        </Segment>
      </Segment>
    );
  }

  render() {
    return (
      <div>
        <Dimmer active={this.state.loading} inverted>
          <Loader inverted>Loading</Loader>
        </Dimmer>
        <Message positive hidden={this.state.sprintCreatedBanner}>
          <Message.Header>Sprint created successfully</Message.Header>
          <p>
            Go to your <b>Sprints</b> page to see an overview of your sprints.
          </p>
        </Message>

        {/* <CapacitySummery membersList={this.props.sprintData.team.members} /> */}
        {/* {JSON.stringify(this.state.lastSprintData)} */}
        <List>{this.renderCapacitySummaries()}</List>

        <br />
        <br />
        <br />

        <Button onClick={() => this.props.handleNavigateTabs(1)}>Back</Button>
        <Button
          disabled={!this.state.sprintCreatedBanner}
          primary
          onClick={() => this.createSprint()}
        >
          Create
        </Button>
      </div>
    );
  }
}

export default SprintSummary;
