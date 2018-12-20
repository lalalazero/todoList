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
      const { addTodoItem } = this.props
      let value = this.input.current.value
      let todoItem = {
        value: value,
        isComplete: false
      }
      addTodoItem(todoItem)
      this.input.current.value = ''
    }

    handleInput = (e)=>{
      const input = this.input.current;
      let value = input.value;
      console.log(value);
      if(this.state.onInput === false){
        this.setState({
          onInput: true
        })
      }
    }
    render() {
      return (
        <div className='addTodoArea'>
          <Icon type='plus'></Icon>
          <input ref={this.input} type='text' 
            style={this.state.onInput === true ? {color: 'white'} : {}} 
            placeholder='Add a todo...' 
            onInput={this.handleInput}>
          </input>
        </div>
      )
    }
}

export default AddTodo