import Axios from 'axios';
import config from '../ServerConfig.json';
//#TODO split

const GetTeamDefaultInfo = (teamId) => {
  const url = `${config.EndpointUrl}/teams`;
  const body = {
    teamId: teamId,
    action: 'getTeamData',
  };

  return Axios.post(url, body)
    .then((response) => {
      if (response.data !== 'null') {
        return response.data;
      } else {
        return null;
      }
    })
    .catch((error) => {
      return Promise.reject(new Error('fail to get Team: ', error.response));
    });
};

const GetSprintData = (teamId) => {
  // Authenticate(userInfo)
  //     .then(Response => {
  //       if (Response.Authenticated === true) {
  //         this.props.UpdateUserAuthStatus(Response);
  //         this.navigateTo(this.getReturnPathName());
  //       } else {
  //         this.setState({ error: 'Wrong credentials' });
  //       }
  //     })
  //     .catch(() => {
  //       this.setState({ error: 'Failed to authenticate' });
  //     });

  return GetTeamDefaultInfo(teamId)
    .then((teamResponse) => {
      if (teamResponse !== null) {
        return {
          lastSprintId: teamResponse.lastSprintId,
          team: {
            teamID: teamResponse.id,
            teamName: teamResponse.teamName,
            defaultSprintLength: teamResponse.defaultSprintLength,
            members: teamResponse.members,
          },
        };

        // return GetTeamDefaultMembers(teamResponse.members).then(
        //   memberResponse => {
        //     teamResponse.members = memberResponse;
        //     return teamResponse;
        //   }
        // );
      } else {
        //
      }
    })
    .catch(() => {
      //
    });
};

export default GetSprintData;
