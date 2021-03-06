import React,{ Component } from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip
} from "bizcharts";

class StockChart extends Component{
  render() {
    const history = this.props.history;
    console.log(history);
    const keys = Object.keys(history);
    const values = Object.values(history);
    console.log("From Chart: ");

    const data = [
      {
        date: keys[0],
        value: parseFloat(values[0].toFixed(2)),
      },
      {
        date: keys[1],
        value: parseFloat(values[1].toFixed(2)),
      },
      {
        date: keys[2],
        value: parseFloat(values[2].toFixed(2)),
      },
      {
        date: keys[3],
        value: parseFloat(values[3].toFixed(2)),
      },
      {
        date: keys[4],
        value: parseFloat(values[4].toFixed(2)),
      },
    ];

    const cols = {
      date: {
        alias: "Date",
        type: "timeCat",
        mask: 'MM/DD/YYYY'
      },
      value: {
        alias: "Portfolio Value( USD )"
      }
    };
    return (
        <div>
          <Chart height={300} data={data} scale={cols} forceFit>
            <Axis name="date" />
            <Axis name="value"
                  label={{
                    formatter: val => `${val} USD`
                  }}
            />
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
