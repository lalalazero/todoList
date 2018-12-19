import React, { Component } from 'react';
import _ from 'lodash';
import AddTodo from './components/AddTodo/index.js'
import TodoItem from './components/TodoItem/index.js'
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      todoList: [
        {
          id: 0,
          value: '123',
          isComplete: false
        },
        {
          id: 1,
          value: '234',
          isComplete: false
        },
        {
          id: 2,
          value: 'xxx',
          isComplete: true
        },
        {
          id: 3,
          value: 'yyy',
          isComplete: true
        }
      ]
    }
  }
  addTodoItem = (item)=>{
    this.state.todoList.push(item)
    this.setState({
      todoList: this.state.todoList
    })
  }
  updateTodoStatus = (item, status) => {
    let nList = _.cloneDeep(this.state.todoList)
    let index = nList.indexOf(item)
    if(index >= 0) {
      nList[index].isComplete = status
      this.setState({
        todoList: nList
      })
    }else{
      console.log('cannot find ' + item)
    }
      
  }
  deleteTodo = (item) => {
    let nList = _.cloneDeep(this.state.todoList)
    let todo = nList.filter(obj => obj.id === item.id)[0]
    let index = nList.indexOf(todo)
    if(index >= 0) {
      nList.splice(index,1)
      this.setState({
        todoList: nList
      })
    }else{
      console.log('cannot find ' + item)
    }
    
    
  }
  render() {
    return (
      <div className='layout'>
        <h2>Todo List</h2>
        <AddTodo addTodoItem={this.addTodoItem}></AddTodo>
        <TodoItem handleDelete={this.deleteTodo} handleUpdate={this.updateTodoStatus} todoList={this.state.todoList}></TodoItem>
      </div>
    );
  }
}

export default App;
