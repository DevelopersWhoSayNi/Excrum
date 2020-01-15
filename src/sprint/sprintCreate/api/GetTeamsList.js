//Returns list of teams the user has right to access
import Axios from 'axios';

const GetTeamsList = userId => {
  const url = `https://id2ph21bdc.execute-api.eu-west-1.amazonaws.com/dev/teams?userId=${userId}`;

  return Axios.get(url)
    .then(response => {
      if (response.data !== 'null') {
        const list = GetTeamsDropDownOptionsList(response.data.Teams);
        return list;
      } else {
        return null;
      }
    })
    .catch(error => {
      return Promise.reject(new Error('fail to get Team: ', error.response));
    });
};

const GetTeamsDropDownOptionsList = teamsList => {
  let list = [];
  teamsList.forEach((team, index) => {
    list.push({ key: index, text: team.teamName, value: team.teamId });
  });

  return list;
};

export default GetTeamsList;
