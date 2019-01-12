import { SWITCH_LIST, USER_LIST_LOADED,SET_VISIBILITY, SET_CONTENT_VISIBILITY } from './../actions/list'

import { LIST_TODO_LOADED, LIST_COMPLETE_LOADED, SET_CURRENT_TODO } from './../actions/todo'

import { SET_AUTH } from './../actions/auth'

const initState = {
    x: -1,
    userList: [],
    curListId: 0,
    todoItems: [],
    completeItems: [],
    curListItem: {},
    visible: false,
    curTodo: {},
    contentVisible: false,
    authed: false
}

export const reducers = (state = initState, action) => {
    switch(action.type){
        case USER_LIST_LOADED:{
            return {
                ...state,
                userList: action.payload
            }
        }
        case SWITCH_LIST: {
            const curListItem = state.userList.find(obj => obj.id === action.payload)
            return{
                ...state,
                curListId: action.payload,
                curListItem: Object.assign({},curListItem)
            }
        }
        case LIST_TODO_LOADED: {
            return {
                ...state,
                todoItems: action.payload
            }
        }
        case LIST_COMPLETE_LOADED: {
            return{
                ...state,
                completeItems: action.payload
            }
        }
        case SET_VISIBILITY: {
            if(action.payload === false){
                return{
                    ...state,
                    visible: action.payload,
                    completeItems: []
                }
            }
            return{
                ...state,
                visible: action.payload
            }
        }
        case SET_CURRENT_TODO: {
            let curTodo = state.todoItems.find(obj => obj.id === action.payload)
            let count = 0
            for(const p in curTodo) count++ // 空对象
            if(count === 0){
                const curComplete = state.completeItems.find(obj => obj.id === action.payload)
                console.log('assgin..curComplete',JSON.stringify(Object.assign({},curComplete)))
                return{
                    ...state,
                    curTodo: Object.assign({},curComplete)
                }
            }
            console.log('assgin..curTodo',JSON.stringify(Object.assign({},curTodo)))
            return{
                ...state,
                curTodo: Object.assign({},curTodo)
            }
        }
        case SET_CONTENT_VISIBILITY: {
            console.log('...set content visibility...',action.payload)
            return{
                ...state,
                contentVisible: action.payload
            }
        }
        case SET_AUTH: {
            console.log('set auth...payload=',action.payload)
            return{
                ...state,
                authed: action.payload
            }
        }
        default: return state
    }
}

export default reducers