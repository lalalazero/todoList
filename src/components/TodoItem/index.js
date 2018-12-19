import React, { Component } from 'react'
import './style.css'

export default class TodoItem extends Component {
    constructor(props) {
      super(props)
    }
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
                  <span className='delete' onClick={()=>{this.deleteItem(todo)}}>x</span>
                </li>
              )
            })
          }
          {
            completeList.map((todo, index) => {
              return (
                <li className='todoItem done' key={index} >
                  <span className='anchor' onClick={()=>{this.unDoneItem(todo)}}></span>
                  {todo.value}
                  <span className='delete' onClick={()=>{this.deleteItem(todo)}}>x</span>
                </li>
              )
            })
          }
        </ul>
      )
    }
}