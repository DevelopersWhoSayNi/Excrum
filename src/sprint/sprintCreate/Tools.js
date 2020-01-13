export const GetTotalHours = membersList => {
  let totalHours = 0;

  for (let i = 0; i < membersList.length; i++) {
    for (let j = 0; j < membersList[i].capacityHours.length; j++) {
      totalHours += membersList[i].capacityHours[j].hours;
    }
  }

  return totalHours;
};

const AddZero = num => {
  return num >= 0 && num < 10 ? '0' + num : num + '';
};

export const FormatDate = date => {
  var strDateTime = [
    [
      date.getFullYear(),
      AddZero(date.getMonth() + 1),
      AddZero(date.getDate())
    ].join('-')
  ].join(' ');

  return strDateTime;
};
