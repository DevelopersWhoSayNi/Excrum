export const GetTotalHours = (membersList, groupName) => {
  let totalHours = 0;

  for (let g = 0; g < membersList.length; g++) {
    const newMembers = membersList[g].members;
    if (groupName === 'total' || membersList[g].groupName === groupName) {
      for (let i = 0; i < newMembers.length; i++) {
        for (let j = 0; j < newMembers[i].capacityHours.length; j++) {
          totalHours += newMembers[i].capacityHours[j].hours;
        }
      }
    }
  }

  return totalHours;
};
