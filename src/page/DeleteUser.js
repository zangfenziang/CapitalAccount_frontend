import React from "react";

import { Input, Row, Col, message } from 'antd';

import LegalUserForm from './form/LegalUserForm'
import PersonalUserForm from './form/PersonalUserForm'

import {api} from '../web.config.json'

const Search = Input.Search;

class DeleteUser extends React.Component {
    state = {
        status: 0,
        user: {}
    }
    findPersonalUser = (account_id) => {
        const data = new URLSearchParams();
        data.append('account_id', account_id);
        fetch(api + '/personal_user_find_by_banker', {
            body: data,
            method: "POST",
            credentials: 'include',
            mode: "cors"
        })
        .then(data => data.json())
        .then(json => {
            this.setState({
                status: 1,
                user: json
            })
        })
        .catch(err => {
            message.error(err.message)
            console.error(err)
        })
    }
    findLegalUser = (account_id) => {
        const data = new URLSearchParams();
        data.append('account_id', account_id);
        fetch(api + '/legal_user_find_by_banker', {
            body: data,
            method: "POST",
            credentials: 'include',
            mode: "cors"
        })
        .then(data => data.json())
        .then(json => {
            this.setState({
                status: 2,
                user: json
            })
        })
        .catch(err => {
            message.error(err.message)
            console.error(err)
        })
    }
    findUser = (account_id) =>{
        const data = new URLSearchParams();
        data.append('account_id', account_id);
        fetch(api + '/user_find_by_banker', {
            body: data,
            method: "POST",
            credentials: 'include',
            mode: "cors"
        })
        .then(data => data.json())
        .then(json => {
            if (json.status === 0){
                const user = json.user;
                if (user.account_type === 'Legal'){
                    this.findLegalUser(account_id);
                }
                else{
                    this.findPersonalUser(account_id);
                }
            }
            else{
                message.error('User ID not found');
            }
        })
        .catch(err => {
            console.error(err);
            message.error(err.message);
        })
    }
    deleteUser = (values) => {
        const id = values["account_id"];
        const data = new URLSearchParams();
        data.append('account_id', id);
        fetch(api + '/user_delete_by_banker', {
            body: data,
            method: "POST",
            credentials: 'include',
            mode: "cors"
        })
        .then(data => data.json())
        .then(json => {
            if (json.status === 0){
                message.success(json.message)
                this.setState({
                    status: 0,
                    user: {}
                })
            }
            else{
                message.error(json.message)
            }
        })
        .catch(err => {
            console.error(err)
            message.error(err.message)
        })
    }
    render(){
        const form = ()=>{
            if (this.state.status === 1){
                return <PersonalUserForm handle={this.deleteUser} isSubmit={true} button={'Delete'} values={this.state.user} isChange={false} />
            }
            else if (this.state.status === 2){
                return <LegalUserForm handle={this.deleteUser} isSubmit={true} button={'Delete'} values={this.state.user} isChange={false} />
            }
        }
        return (
            <div>
                <Row>
                    <Col span={6}>
                        <Search
                            placeholder="input Account ID"
                            enterButton="Search"
                            size="large"
                            onSearch={value => {this.findUser(value)}}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={12} offset={6}>
                        {form()}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default DeleteUser;