import React, { Component } from 'react';
import _ from 'lodash';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './routes/Login'
import Register from './routes/Register'
import Home from './routes/Home'
import { request } from './utils/request'
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      todoList: [
        
      ],
      curList: -1
    }
  }

  updateCurList = (listId)=>{
    this.setState({
      curList: listId
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


  addTodoItem = (item)=>{
    item.id = this.state.todoList.length + 1;
    this.state.todoList.push(item)
    this.setState({
      todoList: this.state.todoList
    })
  }
  updateTodoStatus = (item, status) => {
    let nList = _.cloneDeep(this.state.todoList)
    let todo = nList.filter(obj => obj.id === item.id)[0]
    let index = nList.indexOf(todo)
    if(index >= 0) {
      nList[index].isComplete = status
      this.setState({
        todoList: nList
      })
    }else{
      console.log('cannot find ' + item)
    }
      
  }
  deleteTodo = (item) => {
    let nList = _.cloneDeep(this.state.todoList)
    let todo = nList.filter(obj => obj.id === item.id)[0]
    let index = nList.indexOf(todo)
    if(index >= 0) {
      nList.splice(index,1)
      this.setState({
        todoList: nList
      })
    }else{
      console.log('cannot find ' + item)
    }
    
    
  }

  myRender = (props)=>{
    return(
      <Home 
      xxx={'xxx'} 
      addTodoItem={this.addTodoItem}
      deleteTodo={this.deleteTodo}
      updateTodoStatus={this.updateTodoStatus}
      todoList={this.state.todoList}
      queryListItems={this.queryListItems}
      curList={this.state.curList}
      updateCurList={this.updateCurList}
      {...props}></Home>
    )
  }
  

  render() {
    const x = () => <h2>xxxxxx</h2>
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

export default App;
