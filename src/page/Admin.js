import React from "react";
import config from '../web.config.json'

import { Layout, Menu, Icon, Dropdown } from 'antd';

import AddUser from './AddUser'
import DeleteUser from './DeleteUser'
import LockUser from './LockUser'
import UnlockUser from './UnlockUser'

const { Header, Sider, Content } = Layout;

const api = config.api

function handleLogoutMenuClick(e){
  document.location.href = '#/adminLogin'
}

const menu = (
  <Menu onClick={handleLogoutMenuClick}>
    <Menu.Item>
      登出
    </Menu.Item>
  </Menu>
)

class Admin extends React.Component {
  state = {
    collapsed: false,
    user: '',
    key: '1'
  };

  async componentWillMount(){
    await fetch(api + '/banker_login_status', {
      method: 'POST',
      credentials: 'include',
      mode: "cors"
    })
    .then(data=>data.json())
    .then(json=>{
      if (json.status !== 0){
        document.location.href = "#/adminLogin";
      }
      else{
        this.setState({
          user: json.message,
        })
      }
    })
    .catch(err=>{
      console.error(err);
    });
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  handleMenuClick = (e) => {
    this.setState({
      key: e.key
    })
  }

  Page = ()=>{
    switch (this.state.key){
      case '1':
        return <AddUser />;
      case '2':
        return <DeleteUser />;
      case '3':
        return <LockUser />
      case '4':
        return <UnlockUser />
      default:
        return <AddUser />;
    }
  }

  render() {
    const page = this.Page()
    return (
      <div id="components-layout-demo-custom-trigger">
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo"><strong>股票交易系统</strong></div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.handleMenuClick} >
              <Menu.Item key="1">
                <Icon type="user-add" />
                <span>开户</span>
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="user-delete" />
                <span>销户</span>
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="lock" />
                <span>挂失</span>
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="unlock" />
                <span>重新开户</span>
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
      </div>
    );
  }
}

export default Admin;