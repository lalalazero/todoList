import React from 'react';
import _ from 'lodash';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from './routes/Login'
import Register from './routes/Register'
import Home from './routes/Home'
import './App.css';
import { request } from './utils/request';

const isAuthed = async ()=>{
  const res = await request('valid')
  if(res && res.status === 0){
    console.log('auth is true..')
    return true
  }else{
    console.log('auth is false')
    return false
  }
  console.log('auth is undefined ...end...')
}

const PrivateRout = ({component: Component, ...rest})=>{
  return (
    <Route {...rest} render={props => isAuthed ? (
      <Component {...props} />
    ):(
      <Redirect to={{ pathname: '/login', state: { from: props.location }}} />
    )} >
    </Route>
  )
}
const App = () => {
  return (
    <Router>
      <div className='layout'>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRout path='/' exact component={Home}/>
      </div>
    </Router>
  
  )
};

export default App;

