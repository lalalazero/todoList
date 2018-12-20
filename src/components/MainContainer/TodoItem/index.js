import React, { Component } from 'react'
import { Icon } from 'antd'
import './style.css'

export default class TodoItem extends Component {
    doneItem = (item) => {
      const { handleUpdate } = this.props
      handleUpdate(item, true)
    }
    unDoneItem = (item) => {
      const { handleUpdate } = this.props
      handleUpdate(item, false)
    }
    deleteItem = (item) => {
      const { handleDelete } = this.props
      handleDelete(item)
    }
    render() {
      const { todoList } = this.props
      const completeList = todoList.filter(todo => todo.isComplete === true)
      const notCompleteList = todoList.filter(todo => todo.isComplete === false)
      return (
        <ul className='todoItems'>
          {
            notCompleteList.map((todo, index) => {
              return ( 
                <li className='todoItem' key={index}>
                  <span className='anchor' onClick={()=>{this.doneItem(todo)}}></span>
                  {todo.value}
                </li>
              )
            })
          }
          {
            completeList.map((todo, index) => {
              return (
                <li className='todoItem done' key={index} >
                  {/* <span className='anchor' onClick={()=>{this.unDoneItem(todo)}}></span> */}
                  <Icon type='check-square'></Icon>
                  {todo.value}
                </li>
              )
            })
          }
        </ul>
      )
    }
}