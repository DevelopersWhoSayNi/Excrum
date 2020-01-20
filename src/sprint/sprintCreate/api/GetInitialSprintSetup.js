const GetInitialSprintSetup = () => {
  return {
    id: null,
    sprintNumber: null,
    startDate: null,
    endDate: null,
    iterationPath: null,
    sprintLength: 10,
    lastSprintId: null,
    capacity: 0,
    effortEstimated: 0,
    effortDelivered: 0,
    effortAdded: 0,
    velocity: 0,
    team: {
      teamID: null,
      teamName: null,
      members: []
    }
  };
};

export default GetInitialSprintSetup;
