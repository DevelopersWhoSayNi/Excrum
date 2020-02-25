import Axios from 'axios';

const GetSprints = (action, id) => {
  let url =
    'https://id2ph21bdc.execute-api.eu-west-1.amazonaws.com/dev/sprints';
  if (action === 'GetSprintBySprintID') {
    url = `${url}?sprintID=${id}`;
  } else {
    url = `${url}?teamID=${id}`;
  }
  return Axios.get(url)
    .then(response => {
      if (response.data !== 'null') {
        return JSON.parse(response.data);
      } else {
        return null;
      }
    })
    .catch(error => {
      // return Promise.reject(new Error('fail to get sprints: ', error.response));
    });
};

export default GetSprints;
