import React, { Component } from 'react'
import { Icon } from 'antd'
import './style.css'

export default class TodoItem extends Component {
    constructor(props){
      super(props)
      this.state = {
        
      }
    }
    done = (item) => {
      console.log('done..',item);
      const { handleUpdate } = this.props
      handleUpdate(item, true)
    }
    unDone = (item) => {
      console.log('undone...',item);
      const { handleUpdate } = this.props
      handleUpdate(item, false)
    }
    deleteItem = (item) => {
      console.log('delete item...', item)
      const { handleDelete } = this.props
      handleDelete(item)
    }
    render() {
      const { todoList } = this.props
      const completeList = todoList.filter(todo => todo.done === 1)
      const notCompleteList = todoList.filter(todo => todo.done === 0)

      // const completeList = this.state.todoList.filter(todo => todo.isComplete === true)
      // const notCompleteList = this.state.todoList.filter(todo => todo.isComplete === false)

      return (
        <ul className='todoItems'>
          {
            notCompleteList.map((todo, index) => {
              return ( 
                <li className='todoItem' key={index}>
                  <span className='anchor' onClick={()=>{this.done(todo)}}></span>
                  {todo.value}
                </li>
              )
            })
          }
          {
            completeList.map((todo, index) => {
              return (
                <li className='todoItem done' key={index} >
                  <Icon type='check-square' onClick={()=>{this.unDone(todo)}}></Icon>
                  {todo.value}
                </li>
              )
            })
          }
        </ul>
      )
    }
}