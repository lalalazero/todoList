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
      // let nList = _.cloneDeep(this.state.todoList)
      let index = this.state.todoList.indexOf(item)
      if(index >= 0) {
        this.state.todoList[index].isComplete = status
        this.setState({
          todoList: this.state.todoList
        })
      }else{
        console.log('cannot find ' + item)
      }
      
  }
  deleteTodo = (item) => {
    let index = this.state.todoList.indexOf(item)
    if(index >= 0) {
      this.state.todoList.splice(index,1)
      let nLlist = _.cloneDeep(this.state.todoList)
      this.setState({
        todoList: nLlist
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
