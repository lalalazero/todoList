import React, { Component } from 'react';
import _ from 'lodash';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './routes/Login'
import Register from './routes/Register'
import Home from './routes/Home'
import { request } from './utils/request'
import './App.css';
import { notification } from 'antd';
import { connect } from 'react-redux'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      todoList: [
        
      ],
      completeList: [

      ],
      curList: -1,
      showComplete: false,
      showSideBar: false,
      sideItemId: -1,
      sideItem: {}
    }
  }

  handleShowComplete = () => {
    const show = !this.state.showComplete
    this.setState({
      showComplete: show
    })
    if(show){
      this.queryComplete(this.curList, 1)
    }
  }

  updateCurList = (listId)=>{
    this.setState({
      curList: listId,
      showComplete: false,
      completeList: []
    })
  }

  // 根据id查询清单的todo
  queryListItems = (listId, status) => {
    request(`lists/items?id=${listId}&type=${status}`).then(res => {
        console.log('查询到清单的item。。',res)
        this.setState({
          todoList: res.data,
        })
    })
}

queryComplete = ()=>{
    request(`lists/items?id=${this.state.curList}&type=1`)
    .then(res => {
      console.log('查询到清单的item。。',res)
      this.setState({
        completeList: res.data,
      })})
}


  addTodoItem = (value)=>{
    request(`lists/items?id=${this.state.curList}&value=${value}`,{ method: 'POST' }).then(res=>this.refreshTodos(res))
    
  }
  updateTodoStatus = (id, status) => {
    request(`lists/items/status?id=${id}&status=${status}`,{ method: 'PUT'}).then(res=>this.refreshTodos(res))
      
  }
  updateTodo = (id, title, note) => {
    request(`lists/items`,{
      method: 'PUT',
      body: {
        id: id,
        title: title,
        note: note
      }
    }).then(res=>{
      if(res.status === 0){
        this.refreshTodos(res)
        this.revealSideBar(id)
      }
    })
  }
  deleteTodo = (id) => {
    request(`lists/items?id=${id}`,{ method: 'DELETE' })
    .then(res => {
      if(this.state.showSideBar){
        this.setState({
          showSideBar: false
        })
      }
      this.refreshTodos(res)})
  }

  refreshTodos = (res) => {
    console.log('refresh...',res)
    if(res.status === 0){
      this.queryListItems(this.state.curList, 0)
      this.queryComplete(this.curList,1)
      if(this.state.showSideBar){
        this.revealSideBar(this.state.sideItemId)
      }
    }else{
      notification.error(res.msg)
    }
  }

  foldSideBar = ()=>{
    this.setState({
      showSideBar: false
    })
  }

  revealSideBar = (id)=>{
    this.fetchItem(id)
    this.setState({
      showSideBar: true,
      sideItemId: id,
    })
  }

  fetchItem = (id) => {
    request(`lists/items/detail?id=${id}`).then(res => {
        if(res.status === 0){
            this.setState({
                sideItem: res.data
            })
        }
    })
}

  myRender = (props)=>{
    return(
      <Home 
      xxx={'xxx'} 
      addTodoItem={this.addTodoItem}
      deleteTodo={this.deleteTodo}
      updateTodoStatus={this.updateTodoStatus}
      updateTodo={this.updateTodo}
      todoList={this.state.todoList}
      completeList={this.state.completeList}
      queryListItems={this.queryListItems}
      curList={this.state.curList}
      updateCurList={this.updateCurList}
      queryComplete={this.queryComplete}
      handleShowComplete={this.handleShowComplete}
      showComplete={this.state.showComplete}
      showSideBar={this.state.showSideBar}
      foldSideBar={this.foldSideBar}
      revealSideBar={this.revealSideBar}
      sideItemId={this.state.sideItemId}
      sideItem={this.state.sideItem}
      {...props}></Home>
    )
  }

  

  render() {
    const x = () => <div><h2><span>这是通过state拿到的东西 == {this.props.n}</span>xxxxxx<button onClick={()=>{
      const userid = localStorage.getItem('userId')
        request(`lists?userid=${userid}`).then(res => {
          this.props.todo11(res.data)
        })
    }}>查询用户list</button></h2><div>{
      this.props.todos.map((item, index) => {
        return <li key={index}>{item.name}</li>
      })
    }</div></div>
    return (
        <Router>
          <div className='layout'>
            <Route path="/" exact component={x} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/home" render={this.myRender} xxx={'xxx'}/>
          </div>
          
        </Router>
      
    )
  }
}

function xxx(state){ // mapStateToProperties
  return({
    n: state.n,
    todos: state.todos
  })
}

function yyy(dispatch, ownProperties){ // mapDispatchToProperties
  return({
    'todo11': (data) => dispatch({type: 'todos', payload: data})
  })
}

export default connect(xxx,yyy)(App);
