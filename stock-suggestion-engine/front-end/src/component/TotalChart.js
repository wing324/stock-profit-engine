import React,{ Component } from 'react';
import {
  Chart,
  Geom,
  Axis,
  Tooltip,
  Guide
} from "bizcharts";

class TotalChart extends Component{
  render() {
    const history = this.props.history;
    console.log(history);
    const keys = Object.keys(history);
    const values = Object.values(history);
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
          <Chart height={500} data={data} scale={cols} forceFit>
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
            <Guide>
              <Guide.RegionFilter
                  top
                  start={['min', this.props.profit]}
                  end={['max', 'min']}
                  color="#cf1322"
              />
              <Guide.RegionFilter
                  top
                  start={['min', 'max']}
                  end={['max', this.props.profit]}
                  color="#3f8600"
              />
              <Guide.Line
                  start={["min", this.props.profit]}
                  end={["max", this.props.profit]}
                  lineStyle= {{
                    stroke: '#999',
                    lineDash: [0, 0, 0],
                    lineWidth: 1
                  }}
                  text={{
                    content: "Initial Portfolio Value",
                    position: "end",
                    style: {
                      fontSize: 18,
                      textAlign: "end"
                    }
                  }}
              />
            </Guide>
          </Chart>
        </div>
    );
  }
}

export default TotalChart;
