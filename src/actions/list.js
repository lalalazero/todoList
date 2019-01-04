import { request } from './../utils/request'

export const USER_LIST_LOADED = 'userList_loaded'
export const SWITCH_LIST = 'switch_list'
export const LIST_TODO_LOADED = 'list_todo_loaded'
export const LIST_COMPLETE_LOADED = 'list_complete_loaded'




export const loadUserList = (userId) => dispatch => {
    return request(`lists?userid=${userId}`).then(res => {
        if(res.status === 0){
            dispatch({
                type: USER_LIST_LOADED,
                payload: res.data
            })

            const plan = res.data.find(obj => obj.userCreate === 0 && obj.name === '计划')
            dispatch({
                type: SWITCH_LIST,
                payload: plan.id
            })
        }
    })
}

export const refreshUserList = () => dispatch => {
    return request(`lists?userid=${localStorage.getItem('userId')}`).then(res => {
        if(res.status === 0){
            dispatch({
                type: USER_LIST_LOADED,
                payload: res.data
            })
        }
    })
}

export const deleteList = (listId) => dispatch => {
    return request(`lists?id=${listId}`, { method: 'DELETE'}).then(res => {
        if(res.status === 0){
            dispatch(refreshUserList())
        }
    })
}

export const switchList = (listId) => (dispatch,getState) => {
    dispatch({
        type: SWITCH_LIST,
        payload: listId
    })
    dispatch(loadListTodos(listId))
}

export const loadListTodos = (listId) => (dispatch,getState) => {
    return request(`lists/items?id=${listId}&type=0`).then(res => {
        if(res.status === 0){
            dispatch({
                type: LIST_TODO_LOADED,
                payload: res.data
            })
        }
    })
}

export const loadListComplete = (listId) => (dispatch) => {
    return request(`lists/items?id=${listId}&type=1`).then(res => {
        if(res.status === 0){
            dispatch({
                type: LIST_COMPLETE_LOADED,
                payload: res.data
            })
        }
    })
}


