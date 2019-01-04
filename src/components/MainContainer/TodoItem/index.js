import React, { Component } from 'react'
import { Icon } from 'antd'
import { connect } from 'react-redux'
import { loadListComplete } from './../../../actions/list'
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
    done = (id) => {
      console.log('done..',id);
      const { handleUpdate } = this.props
      handleUpdate(id, 1)
    }
    unDone = (id) => {
      console.log('undone...',id);
      const { handleUpdate } = this.props
      handleUpdate(id, 0)
    }
    deleteItem = (id) => {
      console.log('delete item...', id)
      const { handleDelete } = this.props
      handleDelete(id)
    }
    

    handleShowComplete = ()=>{
        const flag = !this.state.showComplete
        this.setState({
          showComplete: flag
        })
        if(flag){
          this.props.dispatch(loadListComplete(this.props.curListItem.id))
        }
    }

    popMenu = (e) => {
      e.preventDefault()
      if(e.target.nodeName.toLowerCase() !== 'li'){
        return;
      }
      let id = e.target.getAttribute('itemId')
      this.curTodoId = id
      console.log(id)
      const { clientX, clientY } = e
      this.setState({
        contextShow: true
      })
      console.log(clientX, clientY)
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
      this.setState({
        contextShow: false
      })
      switch(type){
        case 1: { // 标记已完成
          this.done(this.curTodoId)
          break
        }
        case 2: { // 标记未完成
          this.unDone(this.curTodoId)
          break
        }
        case 3: { // 修改事项
          this.props.revealSideBar(this.curTodoId)
          break
        }
        case 4: { // 删除事项
          this.deleteItem(this.curTodoId)
          break
        }
        default: break
      }
    }

    handleClick = (e)=>{
      let id = e.target.getAttribute('itemId') - 0
      console.log(e.target.getAttribute('itemId'))
      this.setState({
        curTodoId: id
      })
      const { showSideBar, revealSideBar } = this.props
      if(showSideBar){
        revealSideBar(id)
      }

    }
    doubleClick = (e) => {
      let id = e.target.getAttribute('itemId') - 0
      this.setState({
        curTodoId: id
      })
      const { revealSideBar } = this.props
      revealSideBar(id)
    }

    render() {
      const { todoItems, completeItems } = this.props
      return (
        <ul className='todoItems' onContextMenu={this.popMenu}>
          {
            todoItems.map((todo, index) => {
              return ( 
                <li className='todoItem' key={index} 
                itemId={todo.id} active={this.state.curTodoId === todo.id ? 'yes' : 'no'} 
                onDoubleClick={this.doubleClick}
                onClick={this.handleClick}>
                  <span className='anchor' onClick={()=>{this.done(todo.id)}}></span>
                  {todo.value}
                </li>
              )
            })
          }
          {
            <span className='showCompleteBtn' onClick={this.handleShowComplete}>点击查看已完成的事项</span>
          }
          {
            this.state.showComplete === true ? (completeItems.map((todo, index) => {
              return (
                <li className='todoItem done' key={index}
                active={this.state.curTodoId === todo.id ? 'yes' : 'no'} 
                onClick={this.handleClick}
                onDoubleClick={this.doubleClick}
                itemId={todo.id}>
                  <Icon type='check-square' onClick={()=>{this.unDone(todo.id)}}></Icon>
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
    curListItem: state.curListItem
  }
}
export default connect(mapStateToProps)(TodoItem)