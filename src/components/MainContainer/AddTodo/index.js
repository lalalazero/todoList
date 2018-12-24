import React,  { Component } from 'react'
import { Icon } from 'antd';
import './style.css'
class AddTodo extends Component {
    constructor(props){
      super(props)
      this.input = React.createRef()
      this.state = {
        onInput: false
      }
    }
    addTodo = ()=>{
      // const { addTodoItem } = this.props
      // let value = this.input.current.value
      // let todoItem = {
      //   value: value,
      //   isComplete: false
      // }
      // addTodoItem(todoItem)
      // this.input.current.value = ''
    }
    handleKeydown = (e) => {
      if(e.keyCode === 13){ // 回车键
        this.addTodo()
      }
    }
    render() {
      return (
        <div className='addTodoArea'>
          <Icon type='plus' onClick={this.addTodo}></Icon>
          <input ref={this.input} type='text' 
            placeholder='Add a todo...' 
            onKeyDown={this.handleKeydown}
          >
          </input>
        </div>
      )
    }
}

export default AddTodo