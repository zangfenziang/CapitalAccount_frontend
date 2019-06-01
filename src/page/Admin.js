import React from "react";
import config from '../web.config.json'

import { Layout, Menu, Icon, Dropdown, message, Drawer } from 'antd';

import AddUser from './AddUser'
import DeleteUser from './DeleteUser'
import LockUser from './LockUser'
import UnlockUser from './UnlockUser'
import LegalForm from './form/LegalUserForm'
import PersonalForm from './form/PersonalUserForm'

const { Header, Sider, Content } = Layout;

const api = config.api

function handleLogoutMenuClick(e){  
  const myDate= new Date();    
  myDate.setTime(-1000);
  const data=document.cookie;
  const dataArray=data.split("; ");    
  for(let i=0;i<dataArray.length;i++){    
        let varName=dataArray[i].split("=");    
        document.cookie=varName[0]+"=''; expires="+myDate.toGMTString();    
  }         
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
    key: '1',
    drawerTitle: 'Account User',
    visible: false,
    type: 0,
    drawUser: {}
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

  handleLegalUserShow = async (account_id) => {
    const data = new URLSearchParams();
    data.append('account_id', account_id);
    let user;
    await fetch(api + '/legal_user_find_by_banker', {
      method: 'POST',
      credentials: 'include',
      mode: "cors",
      body: data
    })
    .then(res=>res.json())
    .then(json=>{
      user = json;
    })
    .catch(err=>{
      console.error(err);
      message.error(err.message);
    })
    if (!user){
      return;
    }
    this.setState({
      visible: true,
      type: 1,
      drawUser: user
    })
  }
  handlePersonalUserShow = async (account_id) => {
    const data = new URLSearchParams();
    data.append('account_id', account_id);
    let user;
    await fetch(api + '/personal_user_find_by_banker', {
      method: 'POST',
      credentials: 'include',
      mode: "cors",
      body: data
    })
    .then(res=>res.json())
    .then(json=>{
      user = json;
    })
    .catch(err=>{
      console.error(err);
      message.error(err.message);
    })
    if (!user){
      return;
    }
    this.setState({
      visible: true,
      type: 2,
      drawUser: user
    })
  }

  handleUserShow = async (account_id) => {
    const data = new URLSearchParams();
    data.append('account_id', account_id);
    let user;
    await fetch(api + '/user_find_by_banker', {
      method: 'POST',
      credentials: 'include',
      mode: "cors",
      body: data
    })
    .then(res => res.json())
    .then(json => {
      if (json.status !== 0){
        message.error('cannot find user');
      }
      else{
        user = json.user;
      }
    })
    .catch(err=>{
      console.error(err);
      message.error(err.message)
    })
    if (!user){
      return;
    }
    if (user.account_type === 'Legal'){
      await this.handleLegalUserShow(account_id);
    }
    else if (user.account_type === 'Personal'){
      await this.handlePersonalUserShow(account_id);
    }
  }

  handleShowClose = () => {
    this.setState({
      visible: false
    })
  }

  Page = ()=>{
    switch (this.state.key){
      case '1':
        return <AddUser drawShow={this.handleUserShow} />;
      case '2':
        return <DeleteUser drawShow={this.handleUserShow} />;
      case '3':
        return <LockUser drawShow={this.handleUserShow} />
      case '4':
        return <UnlockUser drawShow={this.handleUserShow} />
      default:
        return <AddUser drawShow={this.handleUserShow} />;
    }
  }

  render() {
    const page = this.Page()
    const drawer = () => {
      if (this.state.type === 1){
        return <LegalForm isSubmit={false} isChange={false} values={this.state.drawUser} />
      }
      else if (this.state.type === 2){
        return <PersonalForm isSubmit={false} isChange={false} values={this.state.drawUser} />
      }
    }
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
        <Drawer title={this.state.drawerTitle} width={640} onClose={this.handleShowClose} visible={this.state.visible}>
          {drawer()}
        </Drawer>
      </div>
    );
  }
}

export default Admin;