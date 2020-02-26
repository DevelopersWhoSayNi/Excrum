import React, { Component } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts';

import { GroupMembersByRole } from '../../api/GetMembersCapacityList';

class SprintCapacityChart extends Component {
  render() {
    var groups = [];

    if (this.props.sprints.length > 0) {
      groups = GroupMembersByRole(this.props.sprints[0].team.members);
    }

    return (
      <div>
        {groups.map((group, index) => {
          return (
            <DrawCapacityDetailsChart
              key={index}
              group={group}
              sprints={this.props.sprints}
            />
          );
        })}
      </div>
    );
  }
}

const DrawCapacityDetailsChart = props => {
  return (
    <div>
      <br />
      <h3>{props.group.role}</h3>
      <LineChart
        width={800}
        height={200}
        data={getChartData(props.group.role, props.sprints)}
        syncId="anyId"
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="Delivered"
          stroke="#19b514"
          fill="#19b514"
        />
        <Line
          type="monotone"
          dataKey="Planned"
          stroke="#0da5bf"
          fill="#0da5bf"
        />
        <Line
          type="monotone"
          dataKey="Suggested"
          stroke="#615d60"
          activeDot={{ r: 8 }}
          strokeDasharray="5 5"
        />
      </LineChart>
    </div>
  );
};

export default SprintCapacityChart;

const getChartData = (groupName, sprints) => {
  var dataList = [];

  sprints.forEach(sprint => {
    const groupCapacity = sprint.capacityDetails.filter(
      s => s.groupName === groupName
    );

    var item = {
      name: sprint.sprintNumber,
      Planned: groupCapacity[0].effortsPlanned,
      Delivered: groupCapacity[0].effortsDelivered,
      Suggested: groupCapacity[0].effortsSuggested
    };

    debugger

    if ((groupCapacity[0].effortsPlanned === 0)) {
      delete item.Planned;
    }

    if ((groupCapacity[0].effortsDelivered === 0)) {
      delete item.Delivered;
    }

    if ((groupCapacity[0].effortsSuggested === 0)) {
      delete item.Suggested;
    }

    dataList.push(item);
  });

  return dataList;
};
