import React,{ Component } from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
} from "bizcharts";
import moment from "moment";

class StockChart extends Component{
  render() {
    const history = this.props.history;
    const keys = Object.keys(history);
    const values = Object.values(history);
    console.log("From Chart: ");

    const data = [
      {
        date: moment.unix(keys[0]/1000).add(8, 'hours').format("L"),
        value: parseFloat(values[0].toFixed(2)),
      },
      {
        date: moment.unix(keys[1]/1000).add(8, 'hours').format("L"),
        value: parseFloat(values[1].toFixed(2)),
      },
      {
        date: moment.unix(keys[2]/1000).add(8, 'hours').format("L"),
        value: parseFloat(values[2].toFixed(2)),
      },
      {
        date: moment.unix(keys[3]/1000).add(8, 'hours').format("L"),
        value: parseFloat(values[3].toFixed(2)),
      },
      {
        date: moment.unix(keys[4]/1000).add(8, 'hours').format("L"),
        value: parseFloat(values[4].toFixed(2)),
      },
    ];
    return (
        <div>
          <Chart height={300} data={data} forceFit>
            <Axis name="date" />
            <Axis name="value" />
            <Tooltip
                crosshairs={{
                  type: "y"
                }}
            />
            <Geom type="line" position="date*value" size={2} />
            <Geom
                type="point"
                position="date*value"
                size={4}
                shape={"circle"}
                style={{
                  stroke: "#fff",
                  lineWidth: 1
                }}
            />
          </Chart>
        </div>
    );
  }
}

export default StockChart;
