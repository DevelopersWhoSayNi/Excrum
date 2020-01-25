export const RemoveMembersPhoto = sprintData => {
  sprintData.team.members.forEach(member => {
    member.photoSrc = null;
  });

  return sprintData;
};

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

const formatAndAdjustDate = (date, addDays = 0) => {
  var splitted = date.split('-');
  return new Date(
    splitted[0],
    parseInt(splitted[1]) - 1,
    parseInt(splitted[2]) + parseInt(addDays)
  );
};

const datediff = (first, second) => {
  // Take the difference between the dates and divide by milliseconds per day.
  // Round to nearest whole number to deal with DST.
  return Math.round((second - first) / (1000 * 60 * 60 * 24));
};

const getHourOfDay = (workDaysList, dayNumber) => {
  let capacityHour = 0;
  workDaysList.forEach(day => {
    if (parseInt(day.dayOfWeek) === dayNumber) {
      capacityHour = day.hours;
      return false;
    }
  });

  return capacityHour;
};

const createCalendarDays = (workDaysList, startDate, endDate) => {
  let adjustedList = [];
  const formatedStartDate = formatAndAdjustDate(startDate);
  const formatedEndDate = formatAndAdjustDate(endDate);
  const firstDayNumberOfSprint = formatedStartDate.getDay();
  const sprintLength = datediff(formatedStartDate, formatedEndDate);

  for (let i = 1; i < firstDayNumberOfSprint; i++) {
    adjustedList.push({
      date: 'blank',
      hours: 0,
      type: 0
    });
  }

  //match hours with where day number === workDaysList

  for (let i = 0; i < sprintLength; i++) {
    let nextDate = formatAndAdjustDate(startDate, i);
    if (nextDate.getDay() !== 6 && nextDate.getDay() !== 0) {
      adjustedList.push({
        date: FormatDate(nextDate),
        hours: getHourOfDay(workDaysList, nextDate.getDay()),
        type: 1
      });
    }
  }

  return adjustedList;
};

export const CreateMembersCapacityList = (membersList, startDate, endDate) => {
  membersList.map((member, index) => {
    const updatedCapacityList = createCalendarDays(
      member.capacityHours,
      startDate,
      endDate
    );
    membersList[index].capacityHours = updatedCapacityList;
    return true; // to get rid of warning
  });

  membersList.sort((a, b) => {
    let nameA = a.name.toUpperCase();
    let nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    } else {
      return 0;
    }
  });

  return membersList;
};
