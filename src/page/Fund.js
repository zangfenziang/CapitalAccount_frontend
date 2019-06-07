import React from 'react';

import { Statistic, Row, Col, Empty, InputNumber, Button, message } from 'antd'

import {api} from '../web.config.json';

class Fund extends React.Component{
    state = {
        fund: null,
    }
    async componentWillMount(){
        const fund = await fetch(api + '/account_fund', {
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
            return json.message;
        }
        })
        .catch(err=>{
            console.error(err);
        });
        const freezing = await fetch(api + '/account_freezing_fund', {
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
            return json.message
        }
        })
        .catch(err=>{
            console.error(err);
        });
        this.setState({
            'fund': fund,
            'freezing': freezing,
        })
    }

    number = 0;

    handle = (number) => {
        const data = new URLSearchParams();
        data.append('number', number);
        fetch(api + "/account_fund_change", {
            body: data,
            method: "POST",
            credentials: 'include',
            mode: "cors"
        })
        .then(res=>res.json())
        .then(json=>{
            if (json.status === 0){
                this.componentWillMount();
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

    plus = () => {
        this.handle(this.number);
    }

    minus = () => {
        this.handle(-this.number);
    }

    changeNumber = (value) => {
        this.number = value;
    }

    render(){
        if (this.state.fund){
            return (
                <div>
                    <Row type="flex" justify="center" align="middle">
                        <Col span={3}>
                            <Statistic title="User Fund" value={this.state.fund} />
                        </Col>
                        <Col span={3}>
                            <Statistic title="User Freezing Fund" value={this.state.freezing} />
                        </Col>
                        <Col span={2} offset={1}>
                            <InputNumber onChange={this.changeNumber} precision={2} step={0.01} min={0} defaultValue={0} />
                        </Col>
                        <Col span={2}>
                            <Button.Group>
                                <Button type="primary" icon="plus" onClick={this.plus} />
                                <Button type="primary" icon="minus" onClick={this.minus} />
                            </Button.Group>
                        </Col>
                    </Row>
                </div>
            )
        }
        else{
            return <Empty />
        }
    }
}

export default Fund;