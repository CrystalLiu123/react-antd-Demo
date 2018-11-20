import React, { Component } from 'react'
import { Table, Modal} from 'antd';
import './TaskTable.css'
import moment from 'moment';
import EditModal from './EditModal'

const confirm = Modal.confirm;

class TaskTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            formVisible: false,     //控制编辑模态框显隐
            initValues:{}         //保存要编辑的数据,作为初始值传入模态框
        }
        this.handleCancel = this.handleCancel.bind(this);
        //列
        this.columns = [
            {title:'序号', dataIndex:'key', key:'key',width:65},
            {title:'任务名', dataIndex:'name', key:'name'},
            {title:'状态', dataIndex:'status', key:'status', width:80},
            {title:'开始时间', dataIndex:'startTime', key:'startTime', width:170,
                render:(time) => 
                    <span>{moment(time).format('YYYY-MM-DD HH:mm')}</span>
            },
            {title:'完成时间', dataIndex:'endTime', key:'endTime', width:170},
            {title:'操作', key:'action',
                render:(record) => {
                    return(
                        <span>
                        {
                            //根据状态不同显示不同操作
                            record.status === '未完成' &&
                            <a href="#" onClick={() => this.complete(record.key)}>完成</a>
                        }
                        {record.status !== '未完成' &&
                            <a href="#" onClick={() => this.redo(record.key)} className="redo">重做</a>
                        }
                        <a href="#" onClick={() => this.showEditModal(record)}>编辑</a>
                        <a href="#" onClick={() => this.showDeleteConfirm(record.key)}>删除</a>  
                     </span>
                )}
            }
        ];
    }

    //完成
    complete(key){
        this.props.save(key);
    }

    //重做
    redo(key){
        this.props.redo(key);
    }

    //显示模态框并更新state
    showEditModal(record){
        this.setState({formVisible: true,
            initValues: record  
        });
    }

    //编辑
    edit = (item) => {
        this.props.edit(item);
    }

    //隐藏模态框
    handleCancel(){
        this.setState({formVisible: false});
    }

    //删除框
    showDeleteConfirm(key){
        confirm({
            title: '确定删除此任务？',
            okText: '确定',
            okType: 'danger',
            cancelText: '取消',
            onOk:() => {
                this.props.delete(key);
            },
            onCancel(){ }
        })
    }

    render(){
        return(
            <div>
                {/* pagination 分页：每页显示五条数据 */}
                <Table dataSource={this.props.dataSource} columns={this.columns}  pagination={{ pageSize:5 }}
                className="TaskTable" bordered ></Table>
                <EditModal visible={this.state.formVisible} handleCancel={this.handleCancel} handleEdit={this.edit} 
                initValues={this.state.initValues}
                /> 
            </div>
        )
    }
}

export default TaskTable;

