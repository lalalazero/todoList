import { SWITCH_LIST, USER_LIST_LOADED,SET_VISIBILITY } from './../actions/list'

import { LIST_TODO_LOADED, LIST_COMPLETE_LOADED, SET_CURRENT_TODO } from './../actions/todo'


const initState = {
    x: -1,
    userList: [],
    curListId: 0,
    todoItems: [],
    completeItems: [],
    curListItem: {},
    visible: false,
    curTodo: {}
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
            const curTodo = state.todoItems.find(obj => obj.id === action.payload)
            return{
                ...state,
                curTodo: Object.assign({},curTodo)
            }
        }
        default: return state
    }
}

export default reducers