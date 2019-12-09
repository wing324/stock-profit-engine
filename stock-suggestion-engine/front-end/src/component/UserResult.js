import React, { Component } from 'react';
import {Card, Row, Col, Statistic, Icon } from 'antd';
import StockChart from './StockChart';

class UserResult extends Component{
  render() {
    console.log("From UserResult");
    const amount = this.props.result.resAmount;
    const strategies = this.props.strategies;
    const result = this.props.result.resStrategies;
    const resultInfo = [];
    const resultHistory = this.props.result.resHistory;
    if(result != null){
      const resultSize = Object.keys(result).length;
      for(let i = 0; i < resultSize; i++){
        const strategyStockListInfo = Object.values(result)[i];
        const strategyStockName = Object.keys(strategyStockListInfo);
        const resultHistoryInfo = JSON.parse(Object.values(resultHistory)[i]);
        const stock0 = strategyStockListInfo[strategyStockName[0]];
        const stock1 = strategyStockListInfo[strategyStockName[1]];
        const stock2 = strategyStockListInfo[strategyStockName[2]];
        const history0 = resultHistoryInfo[strategyStockName[0]];
        const history1 = resultHistoryInfo[strategyStockName[1]];
        const history2 = resultHistoryInfo[strategyStockName[2]];
        const statistic=[];
        for(let j = 0; j < 3; j++){
          if(strategyStockListInfo[strategyStockName[j]].change>=0){
            statistic.push(
                <Statistic
                    value={(strategyStockListInfo[strategyStockName[j]].change).toFixed(2)}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<Icon type="arrow-up" />}
                    suffix={" ( +"+(strategyStockListInfo[strategyStockName[j]].changePercent*100).toFixed(2)+"% )" }
                />
            );
          } else {
            statistic.push(
                <Statistic
                    value={(strategyStockListInfo[strategyStockName[j]].change).toFixed(2)}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<Icon type="arrow-down" />}
                    suffix={" ( "+(strategyStockListInfo[strategyStockName[j]].changePercent*100).toFixed(2)+"% )" }
                />
            );
          }
        }
        resultInfo.push(
            <div key={i}>
              <Card title={Object.values(strategies)[i] + " Investing"} bordered={false}>
                <Row gutter={16}>
                  <Col span={8}>
                    <Card title={strategyStockName[0]} bordered={true}>
                      <strong>Company Name: </strong><span>{stock0.companyName}</span>
                      <br /><br />
                      <strong>Invest Amount: </strong><span>$ {amount[0]}</span>
                      <br /><br />
                      <strong>Stock Price: </strong><span>$ {stock0.latestPrice}</span>
                      <br /><br />
                      { statistic[0] }
                      <br /><br />
                      <StockChart history = {history0}/>
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title={strategyStockName[1]} bordered={true}>
                      <strong>Company Name: </strong><span>{stock1.companyName}</span>
                      <br /><br />
                      <strong>Invest Amount: </strong><span>$ {amount[1]}</span>
                      <br /><br />
                      <strong>Stock Price: </strong><span>$ {stock1.latestPrice}</span>
                      <br /><br />
                      { statistic[1] }
                      <br /><br />
                      <StockChart history = {history1} />
                    </Card>
                  </Col>
                  <Col span={8}>
                    <Card title={strategyStockName[2]} bordered={true}>
                      <strong>Company Name: </strong><span>{stock2.companyName}</span>
                      <br /><br />
                      <strong>Invest Amount: </strong><span>$ {amount[2]}</span>
                      <br /><br />
                      <strong>Stock Price: </strong><span>$ {stock2.latestPrice}</span>
                      <br /><br />
                      { statistic[2] }
                      <br /><br />
                      <StockChart history = {history2}/>
                    </Card>
                  </Col>
                </Row>
              </Card>
            </div>
        );
      }
    }

    return(
        <div>
          { resultInfo }
        </div>
    );
  }
}

export default UserResult;
