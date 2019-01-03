import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

const initState = {

}
const reducer = (state = initState,action)=>{
    switch(action.type){
        case 'lalala':{
            console.log('reducer received..',action.payload)
            return {
                ...state,
                'x': action.payload
            }
        }
        case 'userListLoaded':{
            console.log('reducer received2...',action.payload)
            return {
                ...state,
                userList: action.payload
            }
        }
        default: return state
    }
}
const store = createStore(reducer, applyMiddleware(thunk))
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
