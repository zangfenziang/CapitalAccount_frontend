import React from "react";

import {api} from '../web.config.json';

import {
    Row,
    Col,
    Input,
    message,
} from 'antd';

import AccountForm from './form/AccountForm'

const Search = Input.Search;

class LockUser extends React.Component{
    state = {
        visible: false,
        user: {}
    }
    search = (value) => {
        const data = new URLSearchParams();
        data.append('user_id', value);
        fetch(api + "/account_find_by_banker", {
            body: data,
            method: "POST",
            credentials: 'include',
            mode: "cors"
        })
        .then(res=>res.json())
        .then(json=>{
            if (json.user_id){
                if (json.status === 'Normal'){
                    this.setState({
                        visible: true,
                        user: json,
                    })
                }
                else{
                    message.info('user is Locked');
                }
            }
            else{
                message.error("user name not exists");
            }
        })
        .catch(err=>{
            console.error(err);
            message.error(err.message);
        })
    }
    handle = (values) => {
        const data = new URLSearchParams();
        Object.keys(values).forEach(key=>{
          data.append(key, values[key]);
        });
        fetch(api + "/account_lock_by_banker", {
            body: data,
            method: "POST",
            credentials: 'include',
            mode: "cors"
        })
        .then(res=>res.json())
        .then(json=>{
            if (json.status !== 0){
                message.error(json.message);
            }
            else{
                message.success(json.message);
                this.setState({
                    visible: false,
                    user: {},
                })
            }
        })
        .catch(err=>{
            console.error(err);
            message.error(err.message);
        })
    }
    render(){
        const form = () => {
            if (this.state.visible){
                return (
                    <AccountForm values={this.state.user} button={'Lock'} isChange={false} drawShow={this.props.drawShow} handle={this.handle} />
                )
            }
        }
        return (
            <div>
                <Row style={{marginBottom: 20}}>
                    <Col span={6} offset={9}>
                        <Search 
                        placeholder="input user name" 
                        enterButton="Search"
                        onSearch={this.search} 
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={6} offset={9}>
                        {form()}
                    </Col>
                </Row>
            </div>
        )
    }
}

LockUser.defaultProps = {
    drawShow: async (account_id) => {
        console.log(account_id);
    }
}

export default LockUser