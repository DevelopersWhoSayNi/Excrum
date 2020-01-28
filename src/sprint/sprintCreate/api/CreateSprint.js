import Axios from 'axios';
// import { GetTotalHours } from '../../Tools';

const CreateSprint = props => {
  //using timestamp as unique ID (probably not a good idea)
  var d = new Date();
  props.sprintData.sprintId = d.valueOf().toString();
  // props.sprintData.capacity = GetTotalHours(props.sprintData.team.members);
  const url =
    'https://id2ph21bdc.execute-api.eu-west-1.amazonaws.com/dev/sprints';

  const body = {
    action: 'CreateNewSprint',
    sprintDetails: props.sprintData
  };

  //remove users profile photos as they are redundant.
  // const cleanedUpSprintData = RemoveMembersPhoto(props.sprintData);
  return Axios.post(url, body)
    .then(response => {
      UpdateTeamsLastSprintId(
        props.sprintData.team.teamID,
        props.sprintData.sprintId
      );
      console.log('done, ID: ' + response.data.body.sprintId);
    })
    .catch(error => {
      console.log('Failed');
    });
};

const UpdateTeamsLastSprintId = (teamId, lastSprintId) => {
  const url =
    'https://id2ph21bdc.execute-api.eu-west-1.amazonaws.com/dev/teams';
  const body = {
    action: 'UpdateLastSprint',
    teamId: teamId,
    lastSprintId: lastSprintId
  };

  Axios.post(url, body)
    .then(() => {
      console.log('done');
    })
    .catch(error => {
      console.log('Failed');
    });
};

export default CreateSprint;
