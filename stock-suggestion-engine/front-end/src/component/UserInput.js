import React, { Component } from 'react';
import {Form, Button, Select, InputNumber, Skeleton, Col} from "antd";
import WebTitle from './WebTitle';
import UserResult from './UserResult';
import axios from 'axios';
import Row from "antd/lib/grid/row";

class UserInput extends Component{
  constructor(props) {
    super(props);
    this.state = {
      amount: 5000,
      strategies: [],
      show: false,
      resultData: {},
      loading: false
    }
  }

  handleAmountChange = value => {
    this.setState({
      amount: value
    });
  };

  handleStrategyChange = value => {
    this.setState({
      strategies: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log("Submit");
    console.log(this.state);
    this.props.form.validateFields((err, value) => {
      if (!err) {
        this.setState({
          loading: true,
        });
        axios
            .post('/api/results', this.state)
            .then(response => {
              this.setState({
                show: true,
                resultData: response.data
              });
              console.log("Response is ", response.data);
              this.setState({
                loading: false,
              });
            })
            .catch(error => {
              console.log(error);
            });
      }
    });
  };

  selectLengthValidation = (rule, value, callback) => {
    if (value.length > 2) {
      callback('Your maximum invest strategies are Two.');
    } else {
      callback();
    }
  };

  minNumber = (rule, value, callback) => {
    if (value < 5000) {
      callback('Your minimum invest amount is $5000. ');
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { Option } = Select;
    return(
        <div>
          <WebTitle />
          <div style={{ textAlign: "center"}} onSubmit={this.handleSubmit}>
            <Form layout="horizontal">
              <Form.Item label="Invest Amount">
                {getFieldDecorator('amount', {
                  rules: [
                    {
                      type: "number",
                      message: 'Please input valid number. ',
                    },
                    {
                      required: true,
                      message: 'Please input your invest amount. ',
                    },
                    {
                      validator: this.minNumber,
                    },
                  ],
                  initialValue: 5000
                })(<InputNumber
                    formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={value => value.replace(/\$\s?|(,*)/g, '')}
                    style={{ width: 300}}
                    onChange={this.handleAmountChange}
                />)}
              </Form.Item>
              <Form.Item label="Invest Strategy">
                {getFieldDecorator('strategy', {
                  rules: [
                    {
                      type: 'array'
                    },
                    {
                      required: true,
                      message: 'Please select one or two of your invest strategy',
                    },
                    {
                      validator: this.selectLengthValidation,
                    }
                  ],
                })(
                    <Select mode="multiple" style={{ width: 300 }} onChange={this.handleStrategyChange}>
                      <Option value="Ethical">Ethical Investing</Option>
                      <Option value="Growth">Growth Investing</Option>
                      <Option value="Index">Index Investing</Option>
                      <Option value="Quality">Quality Investing</Option>
                      <Option value="Value">Value Investing</Option>
                    </Select>,
                )}
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit" loading={this.state.loading} style={{ width: 300 }} >
                  Get My Invest Suggestion
                </Button>
              </Form.Item>
            </Form>
          </div>
          <UserResult  result = {this.state.resultData} strategies = {this.state.strategies}/>
          <Row gutter={16}>
            <Col span={8}>
              <Skeleton loading={this.state.loading} active title paragraph={{ rows: 4}}/>
            </Col>
            <Col span={8}>
              <Skeleton loading={this.state.loading} active title paragraph={{ rows: 4}}/>
            </Col>
            <Col span={8}>
              <Skeleton loading={this.state.loading} active title paragraph={{ rows: 4}}/>
            </Col>
          </Row>
        </div>
    );
  }
}

const UserInputForm = Form.create({ name: 'user_input' })(UserInput);

export default UserInputForm;
