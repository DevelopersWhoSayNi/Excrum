import Axios from 'axios';
import config from '../ServerConfig.json';

const GetSprints = (action, id) => {
  let url = `${config.EndpointUrl}/sprints`;

  let body = {};

  if (action === 'GetSprintBySprintID') {
    body = {
      action: 'GetSprint',
      sprintID: id,
    };
  } else {
    body = {
      action: 'GetTeamSprints',
      teamId: id,
    };
  }  

  return Axios.post(url, body)
    .then((response) => {
      if (response.data !== 'null') {
        return orderBySprintDate(response.data);
      } else {
        return null;
      }
    })
    .catch((error) => {
      // return Promise.reject(new Error('fail to get sprints: ', error.response));
    });
};

const orderBySprintDate = (sprints) => {
  if (sprints.constructor === Array) {
    var sortedList = sprints.sort(
      (a, b) => new Date(b.startDate) - new Date(a.startDate)
    );
    return sortedList;
  }
  return sprints;
};

export default GetSprints;
