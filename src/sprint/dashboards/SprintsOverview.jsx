import React, { Component } from 'react';
import {
  Segment,
  List,
  Modal,
  Button,
  Dropdown,
  Dimmer,
  Loader
} from 'semantic-ui-react';
import GetSprints from './api/GetSprints';
import SprintCards from './SprintCard';
import { CapacityDetails } from '../sprintCreate/CapacityDetails';
import { GetTotalHours } from '../Tools';
import UpdatedSprintDetails from './api/UpdatedSprintDetails';
import GetTeamsList from '../sprintCreate/api/GetTeamsList';

let updatedSprintDetails = null;

class SprintsOverview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sprintsList: [],
      selectedSprintData: { sprintNumber: null },
      selectedSprintIndex: null,
      openSprintModal: false,
      openCapacityDetailsModal: false,
      teamsList: [],
      selectedTeam: null,
      loading: false
    };

    this.openCapacityDetailsModal = this.openCapacityDetailsModal.bind(this);
  }

  componentDidMount() {
    //TODO use current user ID
    GetTeamsList('U001').then(res => {
      if (res !== null) {
        this.setState({ teamsList: res });
      }
    });
  }

  openCapacityDetailsModal() {
    this.setState({ openCapacityDetailsModal: true });
  }

  showSprintCards() {
    const sprintCards = this.state.sprintsList.map((sprint, i) => {
      return (
        <List.Item key={i} onClick={e => this.openSprintModal(i)}>
          <SprintCards sprint={sprint} openCapacityDetailsModal={() => {}} />
        </List.Item>
      );
    });

    return (
      <List horizontal selection>
        {sprintCards}
      </List>
    );
  }

  openSprintModal(sprintIndex) {
    this.setState({
      selectedSprintData: this.state.sprintsList[sprintIndex],
      selectedSprintIndex: sprintIndex,
      openSprintModal: true
    });
  }

  updateSprintData = props => {
    //update variable temp
    updatedSprintDetails = props;
  };

  updateCapacity() {
    if (updatedSprintDetails !== null) {
      const updatedCapacity = GetTotalHours(updatedSprintDetails.team.members);
      updatedSprintDetails.capacity = updatedCapacity;
      UpdatedSprintDetails(updatedSprintDetails);
    }
  }

  handleTeamChange(e) {
    this.setState({ selectedTeam: e.value, loading: true });

    GetSprints('', e.value).then(res => {
      this.setState({ sprintsList: res, loading: false });
    });
  }

  closeSprintModal = () => this.setState({ openSprintModal: false });
  closeCapacityDetailsModal = () =>
    this.setState({ openCapacityDetailsModal: false });

  render() {
    return (
      <div>
        <Modal
          open={this.state.openSprintModal}
          onClose={e => this.closeSprintModal()}
        >
          <Modal.Header>
            Sprint Number: {this.state.selectedSprintData.sprintNumber}
          </Modal.Header>
          <Modal.Content>
            <SprintCards
              sprint={this.state.selectedSprintData}
              openCapacityDetailsModal={this.openCapacityDetailsModal}
            />
            <Button onClick={e => this.closeSprintModal()}>Cancel</Button>
            <Button
              primary
              onClick={e => {
                this.updateCapacity();
                this.closeSprintModal();
              }}
            >
              Save
            </Button>
            <Button>Delete</Button>
          </Modal.Content>
        </Modal>

        <Modal
          open={this.state.openCapacityDetailsModal}
          onClose={e => this.closeCapacityDetailsModal()}
        >
          <Modal.Header>Capacity details</Modal.Header>
          <Modal.Content>
            {this.state.selectedSprintData.sprintNumber == null ? (
              <div>X</div>
            ) : (
              <div>
                <CapacityDetails
                  sprintData={this.state.selectedSprintData}
                  updateSprintData={this.updateSprintData}
                />
                <Button onClick={e => this.closeCapacityDetailsModal()}>
                  Done
                </Button>
              </div>
            )}
          </Modal.Content>
        </Modal>

        <Segment compact className="MainForm">
          <Dimmer active={this.state.loading} inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>

          <Dropdown
            style={{ width: '20%' }}
            placeholder="Select your team"
            search
            selection
            fluid
            options={this.state.teamsList}
            value={this.state.selectedTeam}
            onChange={(value, e) => {
              this.handleTeamChange(e);
            }}
          />

          {this.showSprintCards()}
        </Segment>
      </div>
    );
  }
}

export default SprintsOverview;
