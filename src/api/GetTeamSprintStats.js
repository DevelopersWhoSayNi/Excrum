import Axios from 'axios';
import config from '../ServerConfig.json';

const GetTeamSprintStats = lastSprintId => {
  const url = `${config.EndpointUrl}/sprints?sprintID=${lastSprintId}`;
  
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

export default GetTeamSprintStats;
