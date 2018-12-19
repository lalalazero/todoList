import React, { Component } from 'react';
import './App.css';


class AddTodo extends Component {
  constructor(props){
    super(props)
    this.input = React.createRef()
  }
  addTodo = ()=>{
    const { addTodoItem } = this.props
    let value = this.input.current.value
    let todoItem = {
      value: value,
      isComplete: false
    }
    addTodoItem(todoItem)
    this.input.current.value = ''
  }
  render() {
    return (
      <div>
        <input ref={this.input} type='text'></input>
        <button onClick={this.addTodo}>add</button>
      </div>
    )
  }
}

class TodoItem extends Component {
  render() {
    const { todoList } = this.props
    return (
      <ul>
        {
          todoList.map((todo, index) => {
            return <li key={index} >{todo.value}</li>
          })
        }
      </ul>
    )
  }
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      todoList: [
        {
          value: '123',
          isComplete: false
        },
        {
          value: '234',
          isComplete: false
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
  render() {
    return (
      <div>
        <h2>Todo List</h2>
        <AddTodo addTodoItem={this.addTodoItem}></AddTodo>
        <TodoItem todoList={this.state.todoList}></TodoItem>
      </div>
    );
  }
}

export default App;
