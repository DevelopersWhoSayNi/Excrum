import React, { Component } from 'react';
import {
  Button,
  Message,
  Dimmer,
  Loader,
  Segment,
  Input,
  List
} from 'semantic-ui-react';
import CreateSprint from './api/CreateSprint';
import GetTeamSprintStats from './api/GetTeamSprintStats';

//TODO: create a class 'reactive', that pushes state change 'with API call result in it' as props to TaskForm
// import { RemoveMembersPhoto } from '../Tools';

class SprintSummary extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newSprintData: this.props.sprintData,
      lastSprintData: null,
      sprintCreatedBanner: true,
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    GetTeamSprintStats(this.props.sprintData.lastSprintId).then(res => {
      if (res === null) {
        this.setState({
          loading: false
        });
      } else {
        ///
        this.setState({
          loading: false,
          lastSprintData: {
            sprintNumber: res.sprintNumber,
            capacityHours: res.capacity,
            effortsSuggested: res.effortsSuggested,
            effortsPlanned: res.effortsPlanned,
            effortsAdded: res.effortsAdded,
            effortsDelivered: res.effortsDelivered
          }
        });
      }
    });
  }

  createSprint() {
    this.setState({ loading: true });
    CreateSprint(this.props).then(() => {
      this.setState({ sprintCreatedBanner: false, loading: false });
    });
  }

  getSuggestedEffort() {
    if (this.state.lastSprintData === null) {
      return 'Suggestions requires more data from previous sprints';
    } else if (
      this.state.lastSprintData.effortDelivered === null ||
      this.state.lastSprintData.effortDelivered === 0
    ) {
      return 'Please fill in efforts delivered in last Sprint';
    } else {
      return (
        (this.state.lastSprintData.effortDelivered /
          this.state.lastSprintData.capacity) *
        this.state.newSprintData.capacity
      );
    }
  }

  handleEffortPlannedChange(value) {
    const newSprintDetails = {
      ...this.state.newSprintData,
      effortEstimated: value
    };
    this.setState({ newSprintData: newSprintDetails });
  }

  handleEffortDeliveredChange(value) {
    const newSprintDetails = {
      ...this.state.lastSprintData,
      effortDelivered: value
    };
    this.setState({ lastSprintData: newSprintDetails });
  }

  getLastSprintCapacityDetail(groupName) {
    // JS find group in lastSprint.capacity base in group name
  }

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

  renderCapacitySummary(newSprintCapacityDetail, lastSprintCapacityDetail) {
    return (
      <div>
        {this.state.lastSprintData ? (
          <Segment className="SprintSummaryBlocks">
            <h2>Last sprint: {this.state.lastSprintData.sprintNumber}</h2>
            <h4>Capacity: {this.state.lastSprintData.capacity}</h4>
            <h4>Suggested Effort: {this.state.lastSprintData.sprintNumber}</h4>
            <h4>Effort Planned: {this.state.lastSprintData.effortEstimated}</h4>
            <h4 className="Rows">
              <p className="InputText">Efforts Added:</p>
              <Input
                className="InputBox"
                fluid
                placeholder={this.state.lastSprintData.effortAdded}
                onChange={e => this.handleEffortPlannedChange(e.target.value)}
              />
            </h4>
            <br />
            <h4 className="Rows">
              <p className="InputText">Efforts Delivered:</p>
              <Input
                className="InputBox"
                fluid
                placeholder={this.state.lastSprintData.effortDelivered}
                onChange={e => this.handleEffortDeliveredChange(e.target.value)}
              />
            </h4>
          </Segment>
        ) : null}

        <Segment className="SprintSummaryBlocks">
          <h2>New sprint: {this.state.newSprintData.sprintNumber}</h2>
          <h4>Capacity: {this.state.newSprintData.capacity}</h4>
          <h4>Suggested Effort: {this.getSuggestedEffort()}</h4>
          <h4 className="Rows">
            <p className="InputText">Effort Planned:</p>
            <Input
              className="InputBox"
              fluid
              placeholder={0}
              onChange={e => this.handleEffortPlannedChange(e.target.value)}
            />
          </h4>
        </Segment>
      </div>
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

        <Button onClick={() => this.props.handleNavigateTabs(2)}>Back</Button>
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
