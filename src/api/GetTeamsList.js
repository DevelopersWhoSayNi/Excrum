//Returns list of teams the user has right to access
import Axios from 'axios';
import config from '../ServerConfig.json';

const GetTeamsList = userId => {
  const url = `${config.EndpointUrl}/teams`;

  return Axios.get(url)
    .then(response => {
      if (response.data !== 'null') {
        const list = GetTeamsDropDownOptionsList(response.data);
        return list;
      } else {
        return null;
      }
    })
    .catch(error => {
      return Promise.reject(new Error('fail to get Team: ', error.response));
    });
};

//#TODO move out

const GetTeamsDropDownOptionsList = teamsList => {
  let list = [];
  teamsList.forEach((team, index) => {
    list.push({ key: index, text: team.teamName, value: team.id });
  });

  return list;
};

export default GetTeamsList;
