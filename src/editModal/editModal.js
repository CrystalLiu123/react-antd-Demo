import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import React, { Component } from 'react'
import { Modal, Button} from 'antd';
import EditForm from './form'

class EditModal extends Component {

    edit = (e) => {
        e.preventDefault();
        let form = this.refs.getFormVlaue;
        form.validateFields((err, fieldsValue) => {
            if(!err){
                //获取表单中的各字段
                const values = {
                    'key': fieldsValue.init.key,
                    'name': fieldsValue.init.name,
                    'status': fieldsValue.init.status,
                    'startTime': fieldsValue['starttime'].format('YYYY-MM-DD HH:mm'),
                    'endTime':fieldsValue['endtime'] !== undefined ? fieldsValue['endtime'].format('YYYY-MM-DD HH:mm') : undefined
                }
                this.props.handleEdit && typeof this.props.handleEdit === "function" && this.props.handleEdit(values);
                this.props.hideEditModal && typeof this.props.hideEditModal === "function" && this.props.hideEditModal();  //隐藏编辑模态框
            }
        });
    }

    //隐藏编辑模态框
    cancel = () => {
         this.props.hideEditModal && typeof this.props.hideEditModal === "function" &&  this.props.hideEditModal();
    }

    render(){  
        return(
            // 汉化
            <LocaleProvider locale={zh_CN}>   
            <Modal title="编辑" visible={this.props.visible} onCancel={this.cancel} destroyOnClose
                footer={[
                    <Button key="cancel" onClick={this.cancel}>取消</Button>,
                    <Button key="submit" onClick={this.edit}>更改</Button>
                ]} >
               <EditForm initValues={this.props.initValues} ref="getFormVlaue"></EditForm>
            </Modal>   
            </LocaleProvider>    
        )
    }
}

export default EditModal;
