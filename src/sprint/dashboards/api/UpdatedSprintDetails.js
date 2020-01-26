import Axios from 'axios';

const UpdatedSprintDetails = sprintData => {
  const url =
    'https://id2ph21bdc.execute-api.eu-west-1.amazonaws.com/dev/sprints';

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

export default UpdatedSprintDetails;
