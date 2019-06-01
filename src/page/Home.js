import React from "react";
import config from '../web.config.json';

import { Layout, Menu, Icon, Dropdown, message, Drawer, Form, Input, Button } from 'antd';

import Fund from './Fund';

const api = config.api

const { Header, Sider, Content } = Layout;

class Home extends React.Component {

  state = {
    collapsed: false,
    user: '',
    key: '1',
    drawerTitle: 'Change Password',
    visible: false,
  };

  async componentWillMount(){
    await fetch(api + '/account_login_status', {
      method: 'POST',
      credentials: 'include',
      mode: "cors"
    })
    .then(data=>data.json())
    .then(json=>{
      if (json.status !== 0){
        document.location.href = "#/login";
      }
      else{
        this.setState({
          user: json.message,
        })
      }
    })
    .catch(err=>{
      console.error(err);
      document.location.href = "#/login";
    });
  }

  Page = () => {
    if (this.state.key === '1'){
      return <Fund/>
    }
  }
  
  handleMenuClick = (e) => {
    const key = e.key;
    switch(key){
      case '0':
        this.setState({
          visible: true,
        })
        break;
      case '1':
        const myDate= new Date();    
        myDate.setTime(-1000);
        const data=document.cookie;
        const dataArray=data.split("; ");    
        for(let i=0;i<dataArray.length;i++){    
              let varName=dataArray[i].split("=");    
              document.cookie=varName[0]+"=''; expires="+myDate.toGMTString();    
        }         
        document.location.href = '#/login'
        break;
      default:
        break;
    }
  }

  handleChangePasswordSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = new URLSearchParams();
        Object.keys(values).forEach(key=>{
          data.append(key, values[key]);
        });
        fetch(api + "/account_set_login_pwd", {
          body: data,
          method: "POST",
          credentials: 'include',
          mode: "cors"
        })
        .then(res=>res.json())
        .then(json=>{
            if (json.status === 0){
                message.success('success');
                message.info('please login again');
                document.location.href = '#/login';
            }
            else{
                message.error(json.message);
            }
        })
        .catch(err=>{
            console.error(err);
            message.error(err.message);
        })
      }
    });
  }

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key={0}>
          修改密码
        </Menu.Item>
        <Menu.Item key={1}>
          登出
        </Menu.Item>
      </Menu>
    )
    const { getFieldDecorator } = this.props.form;
    const page = this.Page()
    return (
      <div id="components-layout-demo-custom-trigger">
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo"><strong>股票交易系统</strong></div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.handleMenuClick} >
              <Menu.Item key="1">
                <Icon type="user-add" />
                <span>账户余额</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0 }}>
              <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
              />
              <div style={{ float: 'right', paddingRight: '30px' }}>
                <Dropdown overlay={menu} placement="bottomRight" >
                  <div style={{ cursor: 'pointer' }}>
                    <span style={{paddingRight: '3px'}}>{ this.state.user }</span>
                    <Icon type="user" />
                  </div>
                </Dropdown>
              </div>
            </Header>
            <Content
              style={{
                margin: '24px 16px',
                padding: 24,
                background: '#fff',
                minHeight: 280,
                overflowY: 'auto',
              }}
            >
              {page}
            </Content>
          </Layout>
        </Layout>
        <Drawer title={this.state.drawerTitle} width={320} onClose={()=>this.setState({visible: false})} visible={this.state.visible}>
          <Form onSubmit={this.handleChangePasswordSubmit}>
            <Form.Item label='old password'>
              {getFieldDecorator('old_login_pwd', {
                rules: [{ required: true, message: 'Please enter old password' }],
              })(<Input.Password placeholder="Please enter old password" />)}
            </Form.Item>
            <Form.Item label='new password'>
              {getFieldDecorator('login_pwd', {
                rules: [{ required: true, message: 'Please enter password' }],
              })(<Input.Password placeholder="Please enter password" />)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    );
  }
}

export default Form.create()(Home);