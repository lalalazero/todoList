import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const initState = {
    n: 12344,
    todos: [{
        name: 'xixixi'
    }]
}
const reducers = (state = initState, action)=>{
    switch(action.type){
        case 'lalala':{
            return(
                {
                    ...state,
                    n: 456
                }
            )
        }
        case 'todos':{
            return({
                ...state,
                todos: action.payload
            })
        }
        default: return state
    }
}
const store = createStore(reducers)
store.subscribe(render)

function render(){
    ReactDOM.render(
        <Provider store={store}>
          <App />
        </Provider>
        , document.getElementById('root'));
}

render()



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
