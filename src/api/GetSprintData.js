import Axios from 'axios';

//#TODO split

const GetTeamDefaultInfo = teamId => {
  const url =
    'https://id2ph21bdc.execute-api.eu-west-1.amazonaws.com/dev/teams';
  const body = {
    id: teamId,
    action: 'GetTeamDetails'
  };

  return Axios.post(url, body)
    .then(response => {
      if (response.data !== 'null') {
        return response.data;
      } else {
        return null;
      }
    })
    .catch(error => {
      return Promise.reject(new Error('fail to get Team: ', error.response));
    });
};

const GetSprintData = teamId => {
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
    .then(teamResponse => {
      if (teamResponse !== null) {
        return {
          lastSprintId: teamResponse.lastSprintId,
          team: {
            teamID: teamResponse.teamID,
            teamName: teamResponse.teamName,
            defaultSprintLength: teamResponse.defaultSprintLength,
            members: teamResponse.members
          }
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
