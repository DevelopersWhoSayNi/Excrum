const GetInitialSprintSetup = () => {
  return {
    id: null,
    teamID: null,
    teamName: null,
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
    members: []
  };
};

export default GetInitialSprintSetup;
