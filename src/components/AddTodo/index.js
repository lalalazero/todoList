import React,  { Component } from 'react'
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

export default AddTodo