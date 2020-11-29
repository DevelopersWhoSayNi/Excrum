import Axios from 'axios';
import config from '../ServerConfig.json';

const GetMemberDefaultInfo = memberId => {
  const url = `${config.EndpointUrl}/members`;
  const body = {
    id: memberId
  };

  return Axios.post(url, body)
    .then(response => {
      if (response.data !== 'null' || response.data !== null) {
        return response.data;
      } else {
        return null;
      }
    })
    .catch(error => {
      return Promise.reject(new Error('fail to get Team: ', error.response));
    });
};

//#TODO move to common 

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
          console.log({ res });
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
