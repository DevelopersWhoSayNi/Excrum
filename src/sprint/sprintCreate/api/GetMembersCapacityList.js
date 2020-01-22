import Axios from 'axios';

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
  debugger;
  if (typeof membersList[0].role !== 'undefined') {
    //
  }

  let newMembersList = [];

  const roles = [...new Set(membersList.map(x => x.role))];

  roles.forEach(role => {
    let newList = membersList.filter(m => m.role === role);

    newMembersList.push({ role: role, members: newList });
  });

  let updatedMembersList = [];

  let myPromises = [];
  membersList.forEach(member => {
    myPromises.push(
      GetMemberDefaultInfo(member.id).then(res => {
        updatedMembersList.push(res);
      })
    );
  });

  return Promise.all(myPromises).then(() => {
    return updatedMembersList;
  });
};

export default GetTeamDefaultMembers;
