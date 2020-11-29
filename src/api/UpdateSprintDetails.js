import Axios from 'axios';
import config from '../ServerConfig.json';

const UpdateSprintDetails = sprintData => {
  const url = `${config.EndpointUrl}/sprints`;

  const body = {
    action: 'UpdateSprintDetails',
    sprintDetails: sprintData
  };

  return Axios.post(url, body)
    .then(response => {
      console.log('done');
    })
    .catch(error => {
      console.log('Failed');
    });
};

export default UpdateSprintDetails;
