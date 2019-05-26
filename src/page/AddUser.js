import React from "react";

import { Radio, Col, Row, message } from 'antd';

import LegalUserForm from './form/LegalUserForm'
import PersonalUserForm from './form/PersonalUserForm'

import {api} from '../web.config.json'

class AddUser extends React.Component{
    state = {
        type: 'Personal'
    }
    handleTypeChange = (e) => {
        this.setState({
            type: e.target.value
        });
    }
    handleLegalForm = (values) => {
        const data = new URLSearchParams();
        Object.keys(values).forEach(key=>{
          data.append(key, values[key]);
        });
        fetch(api + '/legal_user_add_by_banker', {
            body: data,
            method: "POST",
            credentials: 'include',
            mode: "cors"
        })
        .then(data=>data.json())
        .then(json=>{
            if (json.status === 0){
                message.success(json.message)
            }
            else{
                message.error(json.message)
            }
        })
        .catch(err=>{
            console.error(err)
            message.error(err.message)
        })
    }
    handlePersonalForm = (values) => {
        const data = new URLSearchParams();
        Object.keys(values).forEach(key=>{
          data.append(key, values[key]);
        });
        fetch(api + '/personal_user_add_by_banker', {
            body: data,
            method: "POST",
            credentials: 'include',
            mode: "cors"
        })
        .then(data=>data.json())
        .then(json=>{
            if (json.status === 0){
                message.success(json.message)
            }
            else{
                message.error(json.message)
            }
        })
        .catch(err=>{
            console.error(err)
            message.error(err.message)
        })
    }
    Form = () => {
        switch (this.state.type){
            case 'Personal':
                return <PersonalUserForm handle={this.handlePersonalForm} />
            case 'Legal':
                return <LegalUserForm handle={this.handleLegalForm} />
            default:
                return <PersonalUserForm handle={this.handlePersonalForm} />
        }
    }
    render(){
        let type = this.state.type;
        const form = this.Form(); 
        return (
            <div>
                <Row>
                    <Radio.Group value={type} defaultValue="a" onChange={this.handleTypeChange}>
                        <Radio.Button value='Personal'>个人用户</Radio.Button>
                        <Radio.Button value='Legal'>法人用户</Radio.Button>
                    </Radio.Group>
                </Row>
                <Row>
                    <Col span={12} offset={6}>{form}</Col>
                </Row>
            </div>
        )
    }
}

export default AddUser;