import React, { Component } from 'react';
import {
  Segment,
  List,
  Modal,
  Button,
  Dropdown,
  Dimmer,
  Loader,
  Message
} from 'semantic-ui-react';
import GetSprints from '../../api/GetSprints';
import SprintCards from '../../components/sprints/SprintCard';
import { CapacityDetails } from '../../components/capacity/CapacityDetails';
import { GetTotalHours } from '../../common/Tools';
import UpdateSprintDetails from '../../api/UpdateSprintDetails';
import GetTeamsList from '../../api/GetTeamsList';

let updatedSprintCapacityDetails = null;
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
      loading: false,
      capacityIsDirty: false,
      validationError: null
    };

    this.openCapacityDetailsModal = this.openCapacityDetailsModal.bind(this);
    this.markCapacityDateUpdated = this.markCapacityDateUpdated.bind(this);
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

  showSprintCards(sprints) {
    return sprints.map((sprint, i) => {
      return (
        <List.Item key={i} onClick={e => this.openSprintModal(i)}>
          <SprintCards
            isEditMode={false}
            sprint={sprint}
            openCapacityDetailsModal={() => {}}
          />
        </List.Item>
      );
    });
  }

  openSprintModal(sprintIndex) {
    updatedSprintDetails = this.state.sprintsList[sprintIndex];
    this.setState({
      selectedSprintData: this.state.sprintsList[sprintIndex],
      selectedSprintIndex: sprintIndex,
      openSprintModal: true
    });
  }

  updateSprintCapacity = props => {
    //update variable temp
    updatedSprintCapacityDetails = props;
  };

  updateSprintData = props => {
    updatedSprintDetails = props;
  };

  updateCapacity() {
    if (this.state.capacityIsDirty) {
      this.setState({
        validationError: 'Capacity requires adjustment after sprint date change'
      });
      return;
    }

    if (updatedSprintCapacityDetails !== null) {
      updatedSprintDetails.team = updatedSprintCapacityDetails.team;
    }

    const updatedCapacityHours = GetTotalHours(
      updatedSprintDetails.team.members
    );
    updatedSprintDetails.capacity = updatedCapacityHours;

    let newSprintsList = this.state.sprintsList;
    newSprintsList[this.state.selectedSprintIndex] = updatedSprintDetails;
    this.setState({ sprintsList: newSprintsList });

    UpdateSprintDetails(updatedSprintDetails);
    this.closeSprintModal();
  }

  handleTeamChange(e) {
    this.setState({ selectedTeam: e.value, sprintsList: [], loading: true });

    GetSprints('', e.value).then(res => {
      this.setState({ sprintsList: res, loading: false });
    });
  }

  markCapacityDateUpdated() {
    //Capacity RED, need to be updated!
    this.setState({ capacityIsDirty: true });
  }

  closeSprintModal = () =>
    this.setState({
      openSprintModal: false,
      capacityIsDirty: false,
      validationError: null
    });

  closeCapacityDetailsModal = () => {
    let newSelectedSprint = {
      ...this.state.selectedSprintData,
      team: updatedSprintCapacityDetails.team
    };

    newSelectedSprint.capacity = GetTotalHours(newSelectedSprint.team.members);

    this.setState({
      selectedSprintData: newSelectedSprint,
      openCapacityDetailsModal: false,
      capacityIsDirty: false,
      validationError: null
    });
  };

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
              isEditMode={true}
              capacityIsDirty={this.state.capacityIsDirty}
              sprint={this.state.selectedSprintData}
              updateSprintData={this.updateSprintData}
              markCapacityDateUpdated={this.markCapacityDateUpdated}
              openCapacityDetailsModal={this.openCapacityDetailsModal}
            />
            {this.state.validationError !== null ? (
              <Message negative>
                <p>{this.state.validationError}</p>
              </Message>
            ) : null}
            <Button onClick={e => this.closeSprintModal()}>Cancel</Button>
            <Button primary onClick={e => this.updateCapacity()}>
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
                  sprintData={updatedSprintDetails}
                  updateSprintData={this.updateSprintCapacity}
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

          <List horizontal selection>
            {this.showSprintCards(this.state.sprintsList)}
          </List>
        </Segment>
      </div>
    );
  }
}

export default SprintsOverview;
