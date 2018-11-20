import React, { Component } from 'react';
import AddTask from './AddTask';
import TaskTable from './TaskTable'
import './App.css';
import moment from 'moment';

const defaultData = [
  {key:'1', name:'完成任务清单demo', status:'未完成', startTime:'2018-11-11 04:06', endTime:''},
  {key:'2', name:'学习react', status:'已完成', startTime:'2018-11-09 05:06', endTime:'2018-11-11 09:10'},
]

//根组件
class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      dataSource: defaultData,  //源数据
      count: 2     //数据条数
    }
  }

  //添加一条数据
  handleAdd = (values) => {
      const newData = [{
        key: this.state.count + 1,
        name: values,
        status: '未完成',
        startTime: moment(new Date()).format('YYYY-MM-DD HH:mm')  //默认开始时间为当前时间
      }]

      this.setState({
        dataSource: this.state.dataSource.concat(newData),  //添加新数据到源数据
        count: this.state.count + 1
      });
  }

  //完成
  save = (key) => {
    const newData = this.state.dataSource;
    const index = newData.findIndex(item => item.key === key)   //查找要修改数据的下标
    if(index > -1){   //查找到，修改相应字段
      newData[index].status = '已完成'; 
      newData[index].endTime = moment(new Date()).format('YYYY-MM-DD HH:mm') //默认完成时间为当前时间
      this.setState({dataSource: newData}); 
    }
  }

  //重做
  redo = (key) => {
    const newData = this.state.dataSource;
    const index = newData.findIndex(item => item.key === key)   //查找要修改数据的下标
    if(index > -1){   //查找到，修改相应字段
      newData[index].status = '未完成'; 
      newData[index].endTime = '';
      this.setState({dataSource: newData});
    }
  }

  //删除
  delete = (key) => {
    const newData = this.state.dataSource;
    const index = newData.findIndex(item => item.key === key)   //查找要修改数据的下标
    if(index > -1){   //查找到，删除对应数据
      newData.splice(index, 1);
      this.setState({dataSource: newData});
    }
  } 

  //编辑
  edit = (values) => {
    const newData = this.state.dataSource;
    const index = newData.findIndex(item => item.key === values.key)    //查找要修改数据的下标
    if(index > -1){   //查找到，修改对应数据
      newData.splice(index, 1, values);
      this.setState({dataSource: newData});
    }
  }

  render() {
    return (
      <div className="App">
        <AddTask handleAdd={this.handleAdd} />
        <TaskTable dataSource={this.state.dataSource} save={this.save} redo={this.redo} delete={this.delete} edit={this.edit}/>
      </div>
    );
  }
}

export default App;
