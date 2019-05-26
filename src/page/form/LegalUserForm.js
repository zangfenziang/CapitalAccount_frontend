import React from "react";

import {
    Form,
    Input,
    Button,
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
            <Form.Item label='Legal Number'>
            {getFieldDecorator('legal_num', {
                rules: [{ required: true, message: 'Please input your Legal Number!', whitespace: true }],
                initialValue: this.props['legal_num'] ? this.props['legal_num'] : '',
            })(<Input />)}
            </Form.Item>
            <Form.Item label='License Number'>
            {getFieldDecorator('license_num', {
                rules: [{ required: true, message: 'Please input your License Number!', whitespace: true }],
                initialValue: this.props['license_num'] ? this.props['license_num'] : '',
            })(<Input />)}
            </Form.Item>
            <Form.Item label='Legal Name'>
            {getFieldDecorator('legal_name', {
                rules: [{ required: true, message: 'Please input your Legal Name!', whitespace: true }],
                initialValue: this.props['legal_name'] ? this.props['legal_name'] : '',
            })(<Input />)}
            </Form.Item>
            <Form.Item label='Legal ID'>
            {getFieldDecorator('legal_id_num', {
                rules: [{ required: true, message: 'Please input your Legal ID!', whitespace: true }],
                initialValue: this.props['legal_id_num'] ? this.props['legal_id_num'] : '',
            })(<Input />)}
            </Form.Item>
            <Form.Item label='Legal Address'>
            {getFieldDecorator('legal_address', {
                rules: [{ required: true, message: 'Please input your Legal Address!', whitespace: true }],
                initialValue: this.props['legal_address'] ? this.props['legal_address'] : '',
            })(<Input />)}
            </Form.Item>
            <Form.Item label='Legal Phone'>
            {getFieldDecorator('legal_phone', {
                rules: [{ required: true, message: 'Please input your Legal Phone!', whitespace: true }],
                initialValue: this.props['legal_phone'] ? this.props['legal_phone'] : '',
            })(<Input />)}
            </Form.Item>
            <Form.Item label='Authorize Phone'>
            {getFieldDecorator('authorize_name', {
                rules: [{ required: true, message: 'Please input your Authorize Phone!', whitespace: true }],
                initialValue: this.props['authorize_name'] ? this.props['authorize_name'] : '',
            })(<Input />)}
            </Form.Item>
            <Form.Item label='Authorize ID'>
            {getFieldDecorator('authorize_id_num', {
                rules: [{ required: true, message: 'Please input your Authorize ID!', whitespace: true }],
                initialValue: this.props['authorize_id_num'] ? this.props['authorize_id_num'] : '',
            })(<Input />)}
            </Form.Item>
            <Form.Item label='Authorize Address'>
            {getFieldDecorator('authorize_address', {
                rules: [{ required: true, message: 'Please input your Authorize Address!', whitespace: true }],
                initialValue: this.props['authorize_address'] ? this.props['authorize_address'] : '',
            })(<Input />)}
            </Form.Item>
            <Form.Item label='Authorize Phone'>
            {getFieldDecorator('authorize_phone', {
                rules: [{ required: true, message: 'Please input your Authorize Phone!', whitespace: true }],
                initialValue: this.props['authorize_phone'] ? this.props['authorize_phone'] : '',
            })(<Input />)}
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
}

const LegalUserForm = Form.create({ name: 'register' })(RegistrationForm);

export default LegalUserForm;