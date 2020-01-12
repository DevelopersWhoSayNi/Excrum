export const GetTotalHours = membersList => {
  let totalHours = 0;

  for (let i = 0; i < membersList.length; i++) {
    for (let j = 0; j < membersList[i].capacityHours.length; j++) {
      totalHours += membersList[i].capacityHours[j].hours;
    }
  }

  return totalHours;
};
