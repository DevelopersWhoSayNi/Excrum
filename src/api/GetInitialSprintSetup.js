const GetInitialSprintSetup = () => {
  return {
    sprintId: null,
    sprintNumber: null,
    startDate: null,
    endDate: null,
    iterationPath: null,
    sprintLength: 10,
    lastSprintId: null,
    capacityDetails: [
      {
        groupName: null,
        capacityHours: 0,
        effortsSuggested: 0,
        effortsPlanned: 0,
        effortsAdded: 0,
        effortsDelivered: 0
      }
    ],
    team: {
      teamID: null,
      teamName: null,
      members: []
    }
  };
};

export default GetInitialSprintSetup;
