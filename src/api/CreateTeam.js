import Axios from 'axios';
import config from '../../ServerConfig.json';

const CreateTeam = teamInfo => {
  const url = `${config.Server}/createTeam`;
  const body = {
    name: teamInfo.name,
    rootIterationPath: teamInfo.iteration,
    settings: teamInfo.settings,
    teamMembers: teamInfo.teamMembers
  };
  console.log({url, body})

  return Axios.post(url, body)
    .then(response => {
      console.log({response})
      if (response.data.message === 'Team created') {
        localStorage.setItem('token', response.data.token);
        return {
          Registered: true,
          Token: response.data.token
        };
      } else {
        return {
          Registered: false
        };
      }
    })
    .catch(error => {
      return Promise.reject(new Error('fail to create Team: ', error.response));
    });
};

export default CreateTeam;
