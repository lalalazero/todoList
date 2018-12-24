import React, { Component } from 'react';
import _ from 'lodash';
import { BrowserRouter as Router, Route } from "react-router-dom";
// import Login from './routes/Login'
// import Register from './routes/Register'
// import Home from './routes/Home'
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      todoList: [
        {
          id: 0,
          value: '123',
          isComplete: false
        },
        {
          id: 1,
          value: '234',
          isComplete: false
        },
        {
          id: 2,
          value: 'xxx',
          isComplete: true
        },
        {
          id: 3,
          value: 'yyy',
          isComplete: true
        }
      ]
    }
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
  

  render() {
    const Index = ()=>{return (<h2>index</h2>)}
    const Login=()=>{return(<div>Login</div>)}
    const Register=()=>{return(<div>Register</div>)}
    const Home=()=>{return(<div>home</div>)}
    return (
        <Router>
          {/* <Route path="/" exact component={Index}>
            
          </Route> */}
          <Route path="/login" exact component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/home" component={Home} />
        </Router>
      
    )
  }
}

export default App;
