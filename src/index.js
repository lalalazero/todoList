import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { reducers } from './reducers'
import { request } from './utils/request'
import { SET_AUTH } from './actions/auth'

const store = createStore(reducers, applyMiddleware(thunk))
const dispatch = store.dispatch
const checkAuth = ()=>{
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
checkAuth()
const render = ()=>{
    ReactDOM.render(
        <Provider store={store}> 
            <App />
        </Provider>, document.getElementById('root'));
}
store.subscribe(render)
render()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
