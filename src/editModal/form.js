import React, { Component } from 'react'
import {Form, Input, DatePicker,  Select} from 'antd';
import './editModal.css'
import moment from 'moment';

const Option = Select.Option;
const FormItem = Form.Item;

class Edit extends Component {

    componentDidMount(){
        this.props.form.setFieldsValue({
            init: this.props.initValues,
            starttime: moment(this.props.initValues.startTime)
        });
    }

    //自定义校验函数：完成时间应在开始时间之后
     checkEndTime = (rule, value, callback) => {
        const start = this.props.form.getFieldValue('starttime');
        const end = this.props.form.getFieldValue('endtime');
        if(!end){ 
            callback();     //未选择完成时间时，应先校验不能为空
        }
        start <= end ? callback() : callback("完成时间应在开始时间之后!");
     }

    render(){
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol:{  //标签布局
                sm: {span: 6}
            },
            wrapperCol:{    //输入控件布局
                sm: {span: 18}
            }
        };

        return(
                <Form>
                <FormItem >
                    {getFieldDecorator('init.key')(<Input disabled/>)
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="任务名：">
                    {getFieldDecorator('init.name',{
                        rules:[{ required: true, message: '任务名不能为空！', whitespace: true }]
                        })(<Input />)
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="状态：">
                    {getFieldDecorator('init.status', {
                        rules:[{required: true}]
                    })(
                    <Select onChange={this.selectChange} >
                        <Option value="未完成">未完成</Option>
                        <Option value="已完成">已完成</Option>
                    </Select>)
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="开始时间：">
                    {getFieldDecorator('starttime',{
                        rules:[{ required: true, message: '开始时间不能为空！'}]
                        })(
                            <DatePicker showTime format="YYYY-MM-DD HH:mm" />)
                    }
                </FormItem>
                {this.props.form.getFieldValue('init.status') === '已完成' && 
                <FormItem {...formItemLayout} label="完成时间："  disabled={this.props.form.getFieldValue('init.status') === '未完成' }>
                    {getFieldDecorator('endtime', {
                         rules: [{ required: true, message: '完成时间不能为空！'}
                         , {validator: this.checkEndTime}]
                    })(<DatePicker showTime format="YYYY-MM-DD HH:mm" />)
                    }
                </FormItem>
                }
            </Form>
        )
    }
}
const EditForm = Form.create({
    mapPropsToFields(props){
        return{
            endtime: Form.createFormField({value: props.initValues.endTime ? moment(props.initValues.endTime) : undefined})
        }
    }
})(Edit);

export default EditForm;
