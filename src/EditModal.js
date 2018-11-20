import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import React, { Component } from 'react'
import { Modal, Button, Form, Input, DatePicker,  Select} from 'antd';
import './EditForm.css'
import moment from 'moment';

const Option = Select.Option;
const FormItem = Form.Item;

class EditForm extends Component {
    //编辑
    edit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
            if(!err){
                //获取表单中的各字段
                const values = {
                    'key': fieldsValue['key'],
                    'name': fieldsValue['name'],
                    'status': fieldsValue['status'],
                    'startTime': fieldsValue['starttime'].format('YYYY-MM-DD HH:mm'),
                    'endTime':fieldsValue['endtime'] !== undefined ? fieldsValue['endtime'].format('YYYY-MM-DD HH:mm') : undefined
                }
                this.props.handleEdit(values);
                this.props.handleCancel();  //隐藏编辑模态框
            }
        });
    }

    //隐藏编辑模态框
    cancel(){
        this.props.handleCancel();
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
        //表单布局
        const formItemLayout = {
            labelCol:{  //标签列
                sm: {span: 6}
            },
            wrapperCol:{    //表单元素列
                sm: {span: 18}
            }
        };

        return(
            // 汉化
            <LocaleProvider locale={zh_CN}>   
            <Modal title="编辑" visible={this.props.visible} onCancel={() => this.props.handleCancel()} 
                footer={[
                    <Button key="cancel" onClick={() => this.props.handleCancel()}>取消</Button>,
                    <Button key="submit" onClick={this.edit}>更改</Button>
                ]} >
                <Form >
                <FormItem >
                    {getFieldDecorator('key')(<Input disabled/>)
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="任务名：">
                    {getFieldDecorator('name',{
                        rules:[{ required: true, message: '任务名不能为空！'}]
                        })(<Input />)
                    }
                </FormItem>
                <FormItem {...formItemLayout} label="状态：">
                    {getFieldDecorator('status',{
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
                {this.props.form.getFieldValue('status') === '已完成' && <FormItem {...formItemLayout} label="完成时间：" >
                    {getFieldDecorator('endtime', {
                         rules: [{ required: true, message: '开始时间不能为空！'}
                         , {validator: this.checkEndTime}
                        ]
                    })(<DatePicker showTime format="YYYY-MM-DD HH:mm" />)
                    }
                </FormItem>
                }
            </Form>
            </Modal>   
            </LocaleProvider>    
        )
    }
}
const EditModal = Form.create({
    //赋初值, 日期在 antd 中要传 moment 类型
    mapPropsToFields(props){
        return{
            key: Form.createFormField({ value: props.initValues.key }),
            status: Form.createFormField({ value: props.initValues.status }),
            name: Form.createFormField({ value: props.initValues.name }),
            starttime: Form.createFormField({ value: moment(props.initValues.startTime)}),
            endtime: Form.createFormField({ value: props.initValues.endTime !== '' ? moment(props.initValues.endTime) : undefined })
        }
    }
})(EditForm);

export default EditModal;
