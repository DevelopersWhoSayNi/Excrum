import Axios from 'axios';

const GetTeamDefaultInfo = teamId => {
  const url =
    'https://id2ph21bdc.execute-api.eu-west-1.amazonaws.com/dev/teams';
  const body = {
    id: teamId
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

const GetMemberDefaultInfo = memberId => {
  const url =
    'https://id2ph21bdc.execute-api.eu-west-1.amazonaws.com/dev/members';
  const body = {
    id: memberId
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

const GetTeamDefaultMembers = membersList => {
  let updatedMembersList = [];

  let myPromises = [];
  membersList.forEach(member => {
    myPromises.push(
      GetMemberDefaultInfo(member).then(res => {
        updatedMembersList.push(res);
      })
    );
  });

  return Promise.all(myPromises).then(() => {
    return updatedMembersList;
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
      if (teamResponse !== null && teamResponse.members.length > 0) {
        return GetTeamDefaultMembers(teamResponse.members).then(
          memberResponse => {
            teamResponse.members = memberResponse;
            return teamResponse;
          }
        );
      } else {
        //
      }
    })
    .catch(() => {
      //
    });
};

export default GetSprintData;

// {
//   id: 'S002',
//   teamID: 'T001',
//   teamName: 'Team 001',
//   sprintNumber: ' ',
//   startDate: '2019-01-01',
//   endDate: '2019-01-14',
//   iterationPath: 'Iteration : Customer Intelligence / Sprint ',
//   sprintLength: '10',
//   lastSprintId: 'S001',
//   capacity: 0,
//   effortEstimated: 0,
//   effortDelivered: 0,
//   effortAdded: 0,
//   velocity: 0,
//   members: [
//     {
//       id: '01',
//       name: 'Amir',
//       photoSrc: 'Zeus.png',
//       capacityHours: [
//         { date: '01-09-2019', hours: 8 },
//         { date: '02-09-2019', hours: 8 },
//         { date: '03-09-2019', hours: 8 },
//         { date: '04-09-2019', hours: 8 },
//         { date: '05-09-2019', hours: 8 },
//         { date: '08-09-2019', hours: 8 },
//         { date: '09-09-2019', hours: 8 },
//         { date: '10-09-2019', hours: 8 }
//       ]
//     },
//     {
//       id: '02',
//       name: 'Mariane',
//       photoSrc: 'Mariane.png',
//       capacityHours: [
//         { date: '01-09-2019', hours: 8 },
//         { date: '02-09-2019', hours: 8 },
//         { date: '03-09-2019', hours: 8 },
//         { date: '04-09-2019', hours: 8 },
//         { date: '05-09-2019', hours: 8 },
//         { date: '08-09-2019', hours: 8 },
//         { date: '09-09-2019', hours: 8 },
//         { date: '10-09-2019', hours: 8 }
//       ]
//     },
//     {
//       id: '03',
//       name: 'Naim',
//       photoSrc: 'Kenny.jpg',
//       capacityHours: [
//         { date: '01-09-2019', hours: 8 },
//         { date: '02-09-2019', hours: 8 },
//         { date: '03-09-2019', hours: 8 },
//         { date: '04-09-2019', hours: 8 },
//         { date: '05-09-2019', hours: 8 },
//         { date: '08-09-2019', hours: 8 },
//         { date: '09-09-2019', hours: 8 },
//         { date: '10-09-2019', hours: 8 }
//       ]
//     },
//     {
//       id: '04',
//       name: 'Arthur',
//       photoSrc: 'goldman.jpg',
//       capacityHours: [
//         { date: '01-09-2019', hours: 8 },
//         { date: '02-09-2019', hours: 8 },
//         { date: '03-09-2019', hours: 8 },
//         { date: '04-09-2019', hours: 8 },
//         { date: '05-09-2019', hours: 8 },
//         { date: '08-09-2019', hours: 8 },
//         { date: '09-09-2019', hours: 8 },
//         { date: '10-09-2019', hours: 8 }
//       ]
//     },
//     {
//       id: '05',
//       name: 'Bijan',
//       photoSrc: 'Bijan.jpg',
//       capacityHours: [
//         { date: '01-09-2019', hours: 8 },
//         { date: '02-09-2019', hours: 8 },
//         { date: '03-09-2019', hours: 8 },
//         { date: '04-09-2019', hours: 8 },
//         { date: '05-09-2019', hours: 8 },
//         { date: '08-09-2019', hours: 8 },
//         { date: '09-09-2019', hours: 8 },
//         { date: '10-09-2019', hours: 8 }
//       ]
//     },
//     {
//       id: '06',
//       name: 'Bikash',
//       photoSrc: 'Base64.png',
//       capacityHours: [
//         { date: '01-09-2019', hours: 8 },
//         { date: '02-09-2019', hours: 8 },
//         { date: '03-09-2019', hours: 8 },
//         { date: '04-09-2019', hours: 8 },
//         { date: '05-09-2019', hours: 8 },
//         { date: '08-09-2019', hours: 8 },
//         { date: '09-09-2019', hours: 8 },
//         { date: '10-09-2019', hours: 8 }
//       ]
//     }
//   ]
// }