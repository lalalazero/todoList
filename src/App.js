import React, { Component } from 'react';
import _ from 'lodash';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from './routes/Login'
import Register from './routes/Register'
import Home from './routes/Home'
import './App.css';
import { connect } from 'react-redux';
import { request } from './utils/request';
import { SET_AUTH } from './actions/auth';

const xxx = () => <div>xxx</div>

class App extends Component{
  
  componentDidMount(){
    console.log('App did mount..checkAuth..')
  }
  
  render(){
    const { authed } = this.props;
    console.log('App authed = ',authed)
    return (
      <Router>
        <div className='layout'>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" exact render={props=>{
            const p = authed ? <Home {...props}></Home> : <Redirect to={{pathname:'/xxx'}}></Redirect>
            return p;
          }}></Route>
          <Route path="/xxx" component={xxx}></Route>
        </div>
      </Router>
    
    )
  }
  
};
function mapStateToProps(state){
  return{
    authed: state.authed
  }
}
export default connect(mapStateToProps)(App);

