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
        { id: '01', name: 'Amir', photoSrc: 'Zeus.png' },
        { id: '02', name: 'Mariane', photoSrc: 'Mariane.png' },
        { id: '03', name: 'Bijan', photoSrc: 'Bijan.jpg' },
        { id: '04', name: 'Naim', photoSrc: 'Base64.png' }
      ],
      totalCapacity: 0
    }
  };
};

export default GetInitialSprintSetup;
