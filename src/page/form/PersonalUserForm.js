import React from "react";

import {
    Form,
    Input,
    Button,
    Checkbox,
} from 'antd';

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
        agency: this.props.values['agency'] ? this.props.values['agency'] : false,
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
            this.props.handle(values);
        }
        });
    };

    handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
        callback('Two passwords that you enter is inconsistent!');
        } else {
        callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
        form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    onAgencyChange = (e) => {
        this.setState({
            agency: !this.state.agency,
        })
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState(
            {
                agency: nextProps.values['agency'] ? nextProps.values['agency'] : false,
            }
        )
    }

    render() {

        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
        };
        const tailFormItemLayout = {
        wrapperCol: {
            xs: {
            span: 24,
            offset: 0,
            },
            sm: {
            span: 16,
            offset: 8,
            },
        },
        };

        const button = () => {
            if (this.props.isSubmit){
                return (
                <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                    {this.props.button}
                </Button>
                </Form.Item>
                )
            }
        }

        const password = () => {
            if (this.props.isChange){
                return (
                    <Form.Item label="Password" hasFeedback>
                    {getFieldDecorator('password', {
                        rules: [
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        {
                            validator: this.validateToNextPassword,
                        },
                        ],
                    })(<Input.Password />)}
                    </Form.Item>
                )
            }
        }

        const confirm = () => {
            if (this.props.isChange){
                return (
                    <Form.Item label="Confirm Password" hasFeedback>
                    {getFieldDecorator('confirm', {
                        rules: [
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        {
                            validator: this.compareToFirstPassword,
                        },
                        ],
                    })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>
                )
            }
        }

        const agency = () => {
            if (this.props.isChange){
                return (
                    <Form.Item label='Agency'>
                    {getFieldDecorator('agency', {
                        initialValue: this.props.values['agency'] ? this.props.values['agency'] : false,
                    })(<Checkbox onChange={this.onAgencyChange}>agency</Checkbox>)}
                    </Form.Item>
                )
            }
        }

        const agent = () => {
            if (this.state.agency){
                return (
                    <Form.Item label='Agent ID'>
                    {getFieldDecorator('agent_id_num', {
                        rules: [{ required: true, message: 'Please input your Agent ID!', whitespace: true }],
                        initialValue: this.props.values['agent_id_num'] ? this.props.values['agent_id_num'] : '',
                    })(<Input disabled={!this.props.isChange} />)}
                    </Form.Item>
                )
            }
        }

        return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="ID">
            {getFieldDecorator('account_id', {
                rules: [
                {
                    required: true,
                    message: 'Please input your ID!',
                },
                ],
                initialValue: this.props.values['account_id'] ? this.props.values['account_id'] :'',
            })(<Input disabled={!this.props.isChange} />)}
            </Form.Item>
            {password()}
            {confirm()}
            <Form.Item label='Name'>
            {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your Name!', whitespace: true }],
                initialValue: this.props.values['name'] ? this.props.values['name'] : '',
            })(<Input disabled={!this.props.isChange} />)}
            </Form.Item>
            <Form.Item label='Gender'>
            {getFieldDecorator('gender', {
                rules: [{ required: true, message: 'Please input your Gender!', whitespace: true }],
                initialValue: this.props.values['gender'] ? this.props.values['gender'] : '',
            })(<Input disabled={!this.props.isChange} />)}
            </Form.Item>
            <Form.Item label='ID Number'>
            {getFieldDecorator('id_num', {
                rules: [{ required: true, message: 'Please input your ID Number!', whitespace: true }],
                initialValue: this.props.values['id_num'] ? this.props.values['id_num'] : '',
            })(<Input disabled={!this.props.isChange} />)}
            </Form.Item>
            <Form.Item label='Address'>
            {getFieldDecorator('address', {
                rules: [{ required: true, message: 'Please input your Address!', whitespace: true }],
                initialValue: this.props.values['address'] ? this.props.values['address'] : '',
            })(<Input disabled={!this.props.isChange} />)}
            </Form.Item>
            <Form.Item label='Job'>
            {getFieldDecorator('job', {
                rules: [{ required: true, message: 'Please input your Job!', whitespace: true }],
                initialValue: this.props.values['job'] ? this.props.values['job'] : '',
            })(<Input disabled={!this.props.isChange} />)}
            </Form.Item>
            <Form.Item label='Degree'>
            {getFieldDecorator('degree', {
                rules: [{ required: true, message: 'Please input your Degree!', whitespace: true }],
                initialValue: this.props.values['degree'] ? this.props.values['degree'] : '',
            })(<Input disabled={!this.props.isChange} />)}
            </Form.Item>
            <Form.Item label='Organization'>
            {getFieldDecorator('organization', {
                rules: [{ required: true, message: 'Please input your Organization!', whitespace: true }],
                initialValue: this.props.values['organization'] ? this.props.values['organization'] : '',
            })(<Input disabled={!this.props.isChange} />)}
            </Form.Item>
            <Form.Item label='Phone Number'>
            {getFieldDecorator('phone_num', {
                rules: [{ required: true, message: 'Please input your Phone Number!', whitespace: true }],
                initialValue: this.props.values['phone_num'] ? this.props.values['phone_num'] : '',
            })(<Input disabled={!this.props.isChange} />)}
            </Form.Item>
            {agency()}
            {agent()}
            {button()}
        </Form>
        );
    }
}

RegistrationForm.defaultProps = {
    isSubmit: true,
    button: 'Register',
    values: {},
    isChange: true,
    handle: (values) => {
        console.log(values)
    },
}

const PersonalUserForm = Form.create({ name: 'register' })(RegistrationForm);

export default PersonalUserForm;