export const WeekdayNames = ['Mon ', 'Tue ', 'Wed ', 'Thu ', 'Fri '];

const MonthNames = () => {
  return [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];
};

export const FormatDate = date => {
  var day = date.getDate();
  var monthIndex = date.getMonth();

  return day + ' ' + MonthNames[monthIndex];
};
