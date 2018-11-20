import React, { Component } from 'react';
import { Input, Form, Button } from 'antd'
import './AddTask.css'

const FormItem = Form.Item;

//添加数据组件
class AddForm extends Component{
    //提交表单
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, value) => {
            if(!err){
                this.props.handleAdd(value['taskName']);      
                this.props.form.setFieldsValue({taskName: ''});     //重置输入框
            }
        });
    }

    render(){
        const { getFieldDecorator } = this.props.form;  
        return(
            <Form className="AddTask" layout="inline" onSubmit={this.handleSubmit} >
                <FormItem label="请输入任务事项：" >
                    {
                        getFieldDecorator('taskName',{
                            rules:[{ required: true, message: '任务名不能为空!', whitespace: true }]
                        })(<Input className="AddInput" />)
                    }
                </FormItem>
                <FormItem >
                <Button  type="primary" htmlType="submit">添加</Button>
                </FormItem>
            </Form>
        )
    }
}

const AddTask = Form.create()(AddForm);
export default AddTask;