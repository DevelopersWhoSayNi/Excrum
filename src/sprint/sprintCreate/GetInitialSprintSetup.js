const GetInitialSprintSetup = () => {
  return {
    teamDetails: {
      team: 'DSCI',
      sprintNumber: '#',
      iterationPath: 'Iteration : Customer Intelligence / Sprint ',
      lastSprintEndDate: '2019-01-01',
      startDate: '2019-01-01',
      endDate: '2019-01-14',
      sprintLength: '10'
    },
    capacityDetails: {
      members: [
        {
          id: '01',
          name: 'Amir',
          photoSrc: 'Zeus.png',
          capacityHours: [
            { date: '01-09-2019', hours: 8 },
            { date: '02-09-2019', hours: 8 },
            { date: '03-09-2019', hours: 8 },
            { date: '04-09-2019', hours: 8 },
            { date: '05-09-2019', hours: 8 },
            { date: '08-09-2019', hours: 8 },
            { date: '09-09-2019', hours: 8 },
            { date: '10-09-2019', hours: 8 }
          ]
        },
        {
          id: '02',
          name: 'Mariane',
          photoSrc: 'Mariane.png',
          capacityHours: [
            { date: '01-09-2019', hours: 8 },
            { date: '02-09-2019', hours: 8 },
            { date: '03-09-2019', hours: 8 },
            { date: '04-09-2019', hours: 8 },
            { date: '05-09-2019', hours: 8 },
            { date: '08-09-2019', hours: 8 },
            { date: '09-09-2019', hours: 8 },
            { date: '10-09-2019', hours: 8 }
          ]
        },
        {
          id: '03',
          name: 'Bijan',
          photoSrc: 'Bijan.jpg',
          capacityHours: [
            { date: '01-09-2019', hours: 8 },
            { date: '02-09-2019', hours: 8 },
            { date: '03-09-2019', hours: 8 },
            { date: '04-09-2019', hours: 8 },
            { date: '05-09-2019', hours: 8 },
            { date: '08-09-2019', hours: 8 },
            { date: '09-09-2019', hours: 8 },
            { date: '10-09-2019', hours: 8 }
          ]
        },
        {
          id: '04',
          name: 'Bikash',
          photoSrc: 'Base64.png',
          capacityHours: [
            { date: '01-09-2019', hours: 8 },
            { date: '02-09-2019', hours: 8 },
            { date: '03-09-2019', hours: 8 },
            { date: '04-09-2019', hours: 8 },
            { date: '05-09-2019', hours: 8 },
            { date: '08-09-2019', hours: 8 },
            { date: '09-09-2019', hours: 8 },
            { date: '10-09-2019', hours: 8 }
          ]
        }
      ],
      totalCapacity: 0
    }
  };
};

export default GetInitialSprintSetup;
