import React from 'react';
import _ from 'lodash';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from './routes/Login'
import Register from './routes/Register'
import Home from './routes/Home'
import './App.css';

const x = () => <h2>xxxxxx</h2>
const App = () => {
  return (
    <Router>
      <div className='layout'>
        <Route path="/" exact component={x} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path='/home' component={Home} />
      </div>
      
    </Router>
  
  )
};

export default App;
