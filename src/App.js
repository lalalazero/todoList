import React from 'react';
import _ from 'lodash';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from './routes/Login'
import Register from './routes/Register'
import Home from './routes/Home'
import { request } from './utils/request'
import './App.css';

const isLogin = ()=>{
  const token = localStorage.getItem('token')
  let auth = false;
  request('valid').then(res=>{
    if(res && res.status === 0){
      auth = true;
      
    }
    console.log('2...')
  })
  console.log('1...')
  return auth;
  
}

const auth = {
  isAuthenticated: isLogin()
}
const PrivateRout = ({component: Component, ...rest})=>{
  return (
    <Route {...rest} render={props => auth.isAuthenticated === true ? (
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
        <PrivateRout path='/' exact component={Home} />
      </div>
    </Router>
  
  )
};

export default App;
