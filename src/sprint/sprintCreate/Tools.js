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

export const WeekdayNames = ['Mon ', 'Tue ', 'Wed ', 'Thu ', 'Fri '];

// const MonthNames = () => {
//   return [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December'
//   ];
// };

export const FormatDateCalendar = date => {
  // var day = date.getDate();
  // var monthIndex = date.getMonth();

  // return day + ' ' + MonthNames[monthIndex];

  return date;
};
