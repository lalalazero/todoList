import React,  { Component } from 'react'
import { Icon } from 'antd';
import './style.css'
import { connect } from 'react-redux'

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
      addTodoItem(value)
      this.props.addTodo(this.props.listId, +1)
      this.input.current.value = ''
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

function xxx(state){
  return({
    listId: state.curList.id
  })
}

function yyy(dispatch, ownProperties){
  return({
    'addTodo': (listId, count) => {
      dispatch({
        type: 'updateTodoNumbers',
        payload: {
          listId: listId,
          count: count
        }
      })
    }
  })
}

export default connect(xxx,yyy)(AddTodo)