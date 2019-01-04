import { SWITCH_LIST, USER_LIST_LOADED,LIST_TODO_LOADED, LIST_COMPLETE_LOADED } from './../actions/list'


const initState = {
    x: -1,
    userList: [],
    curListId: 0,
    curListItem: {
        name:''
    },
    todoItems: [],
    completeItems: []
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
            const list = state.userList.find(obj => obj.id === action.payload)
            return{
                ...state,
                curListId: action.payload,
                curListItem: list
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
        default: return state
    }
}

export default reducers