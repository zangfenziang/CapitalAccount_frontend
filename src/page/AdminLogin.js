import React from "react";
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import config from '../web.config.json';

const api = config.api;

class NormalLoginForm extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      message: "",
      messageColor: "red"
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.remember_status = values.remember_status ? 1 : 0;
        const data = new URLSearchParams();
        Object.keys(values).forEach(key=>{
          data.append(key, values[key]);
        });
        fetch(api + "/banker_login", {
          body: data,
          method: "POST",
          credentials: 'include',
          mode: "cors"
        })
        .then(data=>data.json())
        .then(json=>{
          if (json.status === 0){
            document.location.href = "#/admin"
          }
          else{
            this.setState({
              message: json.message,
              messageColor: "red"
            });
          }
        })
        .catch(err=>{
          console.error(err);
          this.setState({
            message: err.message,
            messageColor: "red"
          });
        });
      }
      else{
        console.error(err);
        this.setState({
          message: err.message,
          messageColor: "red"
        });
      }
    });
  };

  

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('user_id', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('user_password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember_status', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>Remember me</Checkbox>)}
          <a className="login-form-forgot" href="#/login">
            Normal User
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <p><font color={this.state.messageColor}>{this.state.message}</font></p>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'admin_login' })(NormalLoginForm);

function adminLogin() {
    return (
        <div id="components-form-demo-normal-login">
            <WrappedNormalLoginForm />
        </div>
    )
}

export default adminLogin;