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
        agency: false,
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

        const agent = () => {
            if (this.state.agency){
                return (
                    <Form.Item label='Agent ID'>
                    {getFieldDecorator('agent_id_num', {
                        rules: [{ required: true, message: 'Please input your Agent ID!', whitespace: true }],
                        initialValue: this.props['agent_id_num'] ? this.props['agent_id_num'] : '',
                    })(<Input />)}
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
                initialValue: this.props['account_id'] ? this.props['account_id'] :'',
            })(<Input />)}
            </Form.Item>
            {password()}
            {confirm()}
            <Form.Item label='Name'>
            {getFieldDecorator('name', {
                rules: [{ required: true, message: 'Please input your Name!', whitespace: true }],
                initialValue: this.props['name'] ? this.props['name'] : '',
            })(<Input />)}
            </Form.Item>
            <Form.Item label='Gender'>
            {getFieldDecorator('gender', {
                rules: [{ required: true, message: 'Please input your Gender!', whitespace: true }],
                initialValue: this.props['gender'] ? this.props['gender'] : '',
            })(<Input />)}
            </Form.Item>
            <Form.Item label='ID Number'>
            {getFieldDecorator('id_num', {
                rules: [{ required: true, message: 'Please input your ID Number!', whitespace: true }],
                initialValue: this.props['id_num'] ? this.props['id_num'] : '',
            })(<Input />)}
            </Form.Item>
            <Form.Item label='Address'>
            {getFieldDecorator('address', {
                rules: [{ required: true, message: 'Please input your Address!', whitespace: true }],
                initialValue: this.props['address'] ? this.props['address'] : '',
            })(<Input />)}
            </Form.Item>
            <Form.Item label='Job'>
            {getFieldDecorator('job', {
                rules: [{ required: true, message: 'Please input your Job!', whitespace: true }],
                initialValue: this.props['job'] ? this.props['job'] : '',
            })(<Input />)}
            </Form.Item>
            <Form.Item label='Degree'>
            {getFieldDecorator('degree', {
                rules: [{ required: true, message: 'Please input your Degree!', whitespace: true }],
                initialValue: this.props['degree'] ? this.props['degree'] : '',
            })(<Input />)}
            </Form.Item>
            <Form.Item label='Organization'>
            {getFieldDecorator('organization', {
                rules: [{ required: true, message: 'Please input your Organization!', whitespace: true }],
                initialValue: this.props['organization'] ? this.props['organization'] : '',
            })(<Input />)}
            </Form.Item>
            <Form.Item label='Authorize ID'>
            {getFieldDecorator('authorize_id_num', {
                rules: [{ required: true, message: 'Please input your Authorize ID!', whitespace: true }],
                initialValue: this.props['authorize_id_num'] ? this.props['authorize_id_num'] : '',
            })(<Input />)}
            </Form.Item>
            <Form.Item label='Phone Number'>
            {getFieldDecorator('phone_num', {
                rules: [{ required: true, message: 'Please input your Phone Number!', whitespace: true }],
                initialValue: this.props['phone_num'] ? this.props['phone_num'] : '',
            })(<Input />)}
            </Form.Item>
            <Form.Item label='Agency'>
            {getFieldDecorator('agency', {
                initialValue: this.props['agency'] ? this.props['agency'] : false,
            })(<Checkbox onChange={this.onAgencyChange}>agency</Checkbox>)}
            </Form.Item>
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