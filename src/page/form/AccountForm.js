import React from "react";

import {
    Form,
    Input,
    Button,
    Icon,
} from 'antd';

class RegistrationForm extends React.Component {
    state = {
        confirmDirty: false,
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
        if (value && value !== form.getFieldValue('login_pwd')) {
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

    search = async () => {
        const account_id = this.props.form.getFieldValue('securities_id');
        this.props.drawShow(account_id);
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
                    {getFieldDecorator('login_pwd', {
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

        return (
        <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="User Name">
            {getFieldDecorator('user_id', {
                rules: [
                {
                    required: true,
                    message: 'Please input your User Name!',
                },
                ],
                initialValue: this.props.values['user_id'] ? this.props.values['user_id'] :'',
            })(<Input disabled={!this.props.isChange} />)}
            </Form.Item>
            {password()}
            {confirm()}
            <Form.Item label='ID'>
            {getFieldDecorator('id', {
                rules: [{ required: true, message: 'Please input your ID!', whitespace: true }],
                initialValue: this.props.values['id'] ? this.props.values['id'] : '',
            })(<Input disabled={!this.props.isChange} />)}
            </Form.Item>
            <Form.Item label='Securities ID'>
            {getFieldDecorator('securities_id', {
                rules: [{ required: true, message: 'Please input your Securities ID!', whitespace: true }],
                initialValue: this.props.values['securities_id'] ? this.props.values['securities_id'] : '',
            })(<Input disabled={!this.props.isChange} suffix={<Icon type="search" onClick={this.search} />} />)}
            </Form.Item>
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
    drawShow: (account_id) => {
        console.log(account_id)
    }
}

const AccountForm = Form.create({ name: 'register' })(RegistrationForm);

export default AccountForm;