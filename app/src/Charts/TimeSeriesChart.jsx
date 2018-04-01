import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

import { convertUnixTimeToDate, convertToTimeSeriesList, moneyFormatter } from '../Utility/HelperFunction';

export default class TimeSeriesChart extends React.Component {

  render = () => {

    const date = this.props.date;
    const data = this.props.data;

    if (date.length > 0) {
      return (
        <ResponsiveContainer>
          <AreaChart data={convertToTimeSeriesList(date, data) }>
            <Area
              type = "monotone"
              dataKey = "Amount"
              stroke = "black"
              fill = "grey"
            />
            <XAxis
              name = "Date"
              domain = {['dataMin', 'dataMax']}
              dataKey = "UnixTime"
              tickSize = {15}
              tickFormatter = {(unixTime) => convertUnixTimeToDate(unixTime)}
              type = "number"
            />
            <YAxis
              width = {100}
              domain = {['auto', 'auto']}
              tickSize = {15}
              tickFormatter = {(amount) => moneyFormatter(amount)}
            />
            <Tooltip
              formatter = {(amount) => moneyFormatter(amount)}
              labelFormatter = {(unixTime) => convertUnixTimeToDate(unixTime)}
            />
          </AreaChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <div className="chart-empty-style"> Data will be visualized here.</div>
      );
    }
  }
}