import Axios from 'axios';
// import { GetTotalHours } from '../../Tools';
import config from '../ServerConfig.json';

const CreateSprint = (sprintData) => {
  //using timestamp as unique ID (probably not a good idea)
  var d = new Date();
  sprintData.id = d.valueOf().toString();
  // sprintData.capacity = GetTotalHours(sprintData.team.members);

  const url = `${config.EndpointUrl}/sprints`;

  var sanitized_sprintData = Sanitize_userProfile_photo(sprintData);

  const body = {
    action: 'CreateNewSprint',
    sprintDetails: sanitized_sprintData,
  };

  //remove users profile photos as they are redundant.
  // const cleanedUpSprintData = RemoveMembersPhoto(sprintData);
  return Axios.post(url, body)
    .then((response) => {
      UpdateTeamsLastSprintId(sprintData.team.teamID, sprintData.id);
    })
    .catch((error) => {
      console.log('Failed');
    });
};

//#TODO split

const UpdateTeamsLastSprintId = (teamId, lastSprintId) => {
  const url = `${config.EndpointUrl}/teams`;
  const body = {
    action: 'updateLastSprint',
    teamId: teamId,
    lastSprintId: lastSprintId,
  };

  Axios.post(url, body)
    .then(() => {
      console.log('done');
    })
    .catch((error) => {
      console.log('Failed : ' + error);
    });
};

const Sanitize_userProfile_photo = (sprintDetails) => {
  // the users profile photos are in base 64 and makes the json content huge,
  //therefore (As a temporary solution) we remove all the values before storage.
  sprintDetails.team.members.forEach((member, index) => {
    member.photoSrc = '';
  });

  return sprintDetails;
};

export default CreateSprint;
