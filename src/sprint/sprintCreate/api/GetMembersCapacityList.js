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

export const GroupMembersByRole = membersList => {
  let groupedByRole = [];
  const roles = [...new Set(membersList.map(x => x.role))];

  roles.forEach(role => {
    let newList = membersList.filter(m => m.role === role);

    groupedByRole.push({ role: role, members: newList });
  });

  return groupedByRole;
};

const GetTeamDefaultMembers = membersList => {
  let groupedByRole = GroupMembersByRole(membersList);
  let updatedMembersList = [];
  let myPromises = [];

  groupedByRole.forEach(group => {
    group.members.forEach(member => {
      myPromises.push(
        GetMemberDefaultInfo(member.id).then(res => {
          res.role = group.role;
          updatedMembersList.push(res);
        })
      );
    });
  });

  return Promise.all(myPromises).then(() => {
    return updatedMembersList;
  });
};

export default GetTeamDefaultMembers;
