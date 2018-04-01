import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Sector, Cell } from 'recharts';

const COLORS = ['#00BAF2', '#00BAF2', '#00a7d9', /* light blue */
'#E80C60', '#E80C60', '#d00a56', /* light pink */
'#9B26AF', '#9B26AF', '#8b229d', /* light purple */
'#E2D51A', '#E2D51A', '#E2D51A', /* med yellow */
'#FB301E', '#FB301E', '#e12b1b', /* med red */
'#00AE4D', '#00AE4D', '#00AE4D']; /* med green */

/* From recharts example */
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, value, nameKey, displayLabelAttribute } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload[nameKey]}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`${payload[displayLabelAttribute]}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`${value}`}
      </text>
    </g>
  );
};

export default class DoughnutChart extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
        activeIndex: -1,
    };
  }

  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  }

  onPieOut = (data, index) => {
    this.setState({
      activeIndex: -1,
    })
  }

  render = () => {

    const chartData = this.props.data;
    const label = this.props.label;
    const value = this.props.value;
    const displayLabelAttribute = this.props.displayLabelAttribute;

    if (chartData.length > 0) {
      return (
        <ResponsiveContainer>
          <PieChart margin = {{ top: 5, right: 100, bottom: 5, left: 100 }}>

            <Pie
              activeIndex={this.state.activeIndex}
              activeShape={renderActiveShape} 
              data = {chartData}
              nameKey = {label}
              dataKey = {value}
              innerRadius = "60%"
              isAnimationActive = {true}
              animationEasing = "ease"
              onMouseEnter = {this.onPieEnter}
              onMouseOut = {this.onPieOut} >
              {
                // Passing several props data to the onMouseEnter event.
                chartData.map((entry, index) => <Cell key={index} fill={COLORS[(index * 3) % 17]} nameKey={label} displayLabelAttribute={displayLabelAttribute} />)
              }
              </Pie>
          </PieChart>
        </ResponsiveContainer>
      );
    } else {
      return (
        <div className="chart-empty-style"> Data will be visualized here.</div>
      );
    }
  }
}