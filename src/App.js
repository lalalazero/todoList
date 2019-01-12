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



class PrivateRout extends Component{
  render(){
    const Component = this.props.component;
    const authed = this.props.authed;
    console.log('PrivateRout authed..' , authed);

    return (
      <Route path="/" {...this.props} 
        render={props => (authed ? (<Component {...props}></Component>) : (<Redirect
          to={{pathname: '/login', state: { from: props.location}}}>
          </Redirect>))
        }
      >
      </Route>
    )
  }
}

class App extends Component{
  
  componentDidMount(){
    console.log('App did mount..checkAuth..')
    this.checkAuth()
  }
  checkAuth = ()=>{
    const { dispatch } = this.props;
    request('valid').then(res => {
      console.log('checkAuth..res=',res)
      if(res && res.status === 0){
        dispatch({
          type: SET_AUTH,
          payload: true
        })
      }
    })
  }
  render(){
    const { authed } = this.props;
    return (
      <Router>
        <div className='layout'>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <PrivateRout path='/' exact authed={authed} component={Home}/>
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

