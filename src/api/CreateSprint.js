import Axios from 'axios';
// import { GetTotalHours } from '../../Tools';
import config from '../ServerConfig.json';

const CreateSprint = sprintData => {
  //using timestamp as unique ID (probably not a good idea)
  var d = new Date();
  sprintData.id = d.valueOf().toString();
  // sprintData.capacity = GetTotalHours(sprintData.team.members);

  const url = `${config.EndpointUrl}/sprints`;

  const body = {
    action: 'CreateNewSprint',
    sprintDetails: sprintData
  };

  //remove users profile photos as they are redundant.
  // const cleanedUpSprintData = RemoveMembersPhoto(sprintData);
  return Axios.post(url, body)
    .then(response => {
      UpdateTeamsLastSprintId(sprintData.team.teamID, sprintData.sprintId);
      console.log('done, ID: ' + response.data.body.sprintId);
    })
    .catch(error => {
      console.log('Failed');
    });
};

//#TODO split

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
