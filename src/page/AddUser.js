import React from "react";

import {api} from '../web.config.json';

import {
    Row,
    Col,
    message
} from 'antd'

import AccountForm from './form/AccountFormAdd'

class AddUser extends React.Component{
    handle = async (values) => {
        const json = await fetch(api + "/user_find_by_id?id=" + values["securities_id"], {
            method: "GET",
            credentials: 'include',
            mode: "cors"
        })
        .then(res=>res.json())
        .catch(err=>{
            console.error(err);
            message.error(err.message);
        })
        if (!json){
            return;
        }
        if (json.status !== 0){
            message.error(json.message);
            return;
        }
        values["securities_id"] = json.message;
        const data = new URLSearchParams();
        Object.keys(values).forEach(key=>{
          data.append(key, values[key]);
        });
        fetch(api + "/account_add_by_banker", {
            body: data,
            method: "POST",
            credentials: 'include',
            mode: "cors"
        })
        .then(res=>res.json())
        .then(json=>{
            if (json.status === 0){
                message.success(json.message);
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
    render(){
        return (
            <div>
                <Row>
                    <Col span={12} offset={6}>
                        <AccountForm isChange={true} drawShow={this.props.drawShow} handle={this.handle} />
                    </Col>
                </Row>
            </div>
        )
    }
}

AddUser.defaultProps = {
    drawShow: async (account_id) => {
        console.log(account_id);
    }
}

export default AddUser