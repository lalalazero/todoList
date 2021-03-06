import React, { Component } from 'react'
import { Icon } from 'antd'
import { connect } from 'react-redux'
import { setCompleteVisibility,setContentVisibility } from './../../../actions/list'
import { loadListComplete, checkTodo, deleteTodo, setCurrentTodo } from './../../../actions/todo'
import './style.css'

class TodoItem extends Component {
    constructor(props){
      super(props)
      this.state = {
        showComplete: false,
        contextShow: false,
        curTodoId: -1,
      }
      this.curTodoId = -1

    }
    

    handleShowComplete = ()=>{
        const flag = !this.props.visible
        this.props.dispatch(setCompleteVisibility(flag))
        if(flag){
          this.props.dispatch(loadListComplete(this.props.curListId))
        }
    }

    popMenu = (e) => {
      e.preventDefault()
      if(e.target.nodeName.toLowerCase() !== 'li'){
        return;
      }
      let id = e.target.getAttribute('itemID') - 0
      this.curTodoId = id
      // console.log(id)
      const { clientX, clientY } = e
      this.setState({
        contextShow: true
      })
      // console.log(clientX, clientY)
      let menu = document.querySelector('.contextMenu')
      menu.style.top = `${clientY}px`
      menu.style.left = `${clientX}px`


      const handler = (e)=>{
        const { clientX, clientY } = e
        const top = window.parseInt(menu.style.top)
        const left = window.parseInt(menu.style.left)
        const width = window.parseInt(window.getComputedStyle(menu).width)
        const height = window.parseInt(window.getComputedStyle(menu).height)
        
        if(
          clientX < left || clientX > (left + width) || clientY < height || clientY > (top + height)
        ){
          this.setState({
            contextShow: false
          })
          document.removeEventListener('click', handler)
        }
      }
      document.addEventListener('click',handler)
    }

    contextClick(type){
      console.log('enter...',type)
      this.setState({
        contextShow: false
      })
      switch(type){
        case 1: { // 标记已完成
          this.props.dispatch(checkTodo(this.curTodoId, 1))
          break
        }
        case 2: { // 标记未完成
          this.props.dispatch(checkTodo(this.curTodoId, 0))
          break
        }
        case 3: { // 修改事项
          if(this.props.curTodo.id !== this.curTodoId){
            this.props.dispatch(setCurrentTodo(this.curTodoId))
          }
          if(this.props.contentVisible === false){
            this.props.dispatch(setContentVisibility(true))
          }
          break
        }
        case 4: { // 删除事项
          this.props.dispatch(deleteTodo(this.curTodoId))
          break
        }
        default: break
      }
    }

    setActive = (e)=>{
      let id = e.target.getAttribute('itemID') - 0
      console.log(e.target.getAttribute('itemID'))
      this.setState({
        curTodoId: id
      })
      if(this.props.curTodo.id === id) return
      console.log('i dispatch..')
      this.props.dispatch(setCurrentTodo(id))
    }
    doubleClick = (e) => {
      let id = e.target.getAttribute('itemID') - 0
      this.setState({
        curTodoId: id
      })
      if(this.props.contentVisible) return
      this.props.dispatch(setContentVisibility(true))
    }

    render() {
      const { todoItems, completeItems, visible } = this.props
      return (
        <ul className='todoItems' onContextMenu={this.popMenu}>
          {
            todoItems.map((todo, index) => {
              return ( 
                <li className='todoItem' key={index} 
                itemID={todo.id} active={this.state.curTodoId === todo.id ? 'yes' : 'no'} 
                onDoubleClick={this.doubleClick}
                onClick={this.setActive}>
                  <span className='anchor' onClick={()=>this.props.dispatch(checkTodo(todo.id, 1))}></span>
                  {todo.value}
                </li>
              )
            })
          }
          {
            <span className='showCompleteBtn' onClick={this.handleShowComplete}>点击查看已完成的事项</span>
          }
          {
            visible === true ? (completeItems.map((todo, index) => {
              return (
                <li className='todoItem done' key={index}
                active={this.state.curTodoId === todo.id ? 'yes' : 'no'} 
                onClick={this.setActive}
                onDoubleClick={this.doubleClick}
                itemID={todo.id}>
                  <Icon type='check-square' onClick={()=>{this.props.dispatch(checkTodo(todo.id, 0))}}></Icon>
                  {todo.value}
                </li>
              )
            })) : ''
            
          }
          {
            <div className='contextMenu' style={this.state.contextShow === true ? { display: 'block' } : { display: 'none' }}>
              <ul>
                <li onClick={()=>this.contextClick(1)}><Icon type='check'></Icon>标记为已完成</li>
                <li onClick={()=>this.contextClick(2)}><Icon type='close'></Icon>标记为未完成</li>
                <li onClick={()=>this.contextClick(3)}><Icon type='edit'></Icon>修改事项</li>
                <li onClick={()=>this.contextClick(4)}><Icon type='delete'></Icon>删除事项</li>
              </ul>
            </div>
          }
        </ul>
      )
    }
}

function mapStateToProps(state){
  return{
    todoItems: state.todoItems,
    completeItems: state.completeItems,
    curListId: state.curListId,
    visible: state.visible,
    curTodo: state.curTodo,
    contentVisible: state.contentVisible
  }
}
export default connect(mapStateToProps)(TodoItem)