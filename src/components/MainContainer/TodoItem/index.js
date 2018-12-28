import React, { Component } from 'react'
import { Icon } from 'antd'
import './style.css'

export default class TodoItem extends Component {
    constructor(props){
      super(props)
      this.state = {
        showComplete: false
      }
    }
    done = (item) => {
      console.log('done..',item);
      const { handleUpdate } = this.props
      handleUpdate(item, 1)
    }
    unDone = (item) => {
      console.log('undone...',item);
      const { handleUpdate } = this.props
      handleUpdate(item, 0)
    }
    deleteItem = (item) => {
      console.log('delete item...', item)
      const { handleDelete } = this.props
      handleDelete(item)
    }
    showComplete = ()=>{
      const { handleShowComplete } = this.props
      handleShowComplete()
    }
    render() {
      const { todoList, completeList, showComplete } = this.props
      return (
        <ul className='todoItems'>
          {
            todoList.map((todo, index) => {
              return ( 
                <li className='todoItem' key={index}>
                  <span className='anchor' onClick={()=>{this.done(todo)}}></span>
                  {todo.value}
                </li>
              )
            })
          }
          {
            <span className='showCompleteBtn' onClick={this.showComplete}>点击查看已完成的事项</span>
          }
          {
            showComplete === true ? (completeList.map((todo, index) => {
              return (
                <li className='todoItem done' key={index} >
                  <Icon type='check-square' onClick={()=>{this.unDone(todo)}}></Icon>
                  {todo.value}
                </li>
              )
            })) : ''
            
          }
        </ul>
      )
    }
}