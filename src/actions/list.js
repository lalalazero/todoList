import { request } from './../utils/request'
import { loadListTodos } from './todo'

export const USER_LIST_LOADED = 'userList_loaded'
export const SWITCH_LIST = 'switch_list'
export const SET_VISIBILITY = 'set_visibility'

export const loadUserList = (userId) => async dispatch => {
    const res = await request(`lists?userid=${userId}`)
    if(res.status === 0){
        await dispatch({
            type: USER_LIST_LOADED,
            payload: res.data
        })
        const plan = res.data.find(obj => obj.userCreate === 0 && obj.name === '计划')
        await dispatch({
            type: SWITCH_LIST,
            payload: plan.id
        })
        await dispatch(loadListTodos(plan.id))
    }
}

export const refreshUserList = () => async (dispatch) => {
    const res = await request(`lists?userid=${localStorage.getItem('userId')}`)
    if(res.status === 0){
        await dispatch({
            type: USER_LIST_LOADED,
            payload: res.data
        })
    }
}

export const addList = (name) => async dispatch => {
    const userid = localStorage.getItem('userId')
    const res = await request(`lists?userid=${userid}&name=${name}`,{ method: 'POST'})
    if(res.status === 0){
        await dispatch(refreshUserList())
    }
}

export const deleteList = (listId) => async (dispatch,getState) => {
    const res = await request(`lists?id=${listId}`, { method: 'DELETE'})
    if(res.status === 0){
        await dispatch(refreshUserList())
        if(getState().curListItem.id === listId){
            dispatch(switchList(20))
        }
    }
}

export const updateList = (name, listId) => async dispatch => {
    const res = await request(`lists?id=${listId}&name=${name}`,{ method: 'PUT' })
    if(res.status === 0){
        await dispatch(refreshUserList())
        await dispatch({
            type: SWITCH_LIST,
            payload: listId
        })
    }
}

export const switchList = (listId) => async (dispatch) => {
    await dispatch({
        type: SWITCH_LIST,
        payload: listId
    })
    dispatch(setCompleteVisibility(false))
    dispatch(loadListTodos(listId))
}



export const setCompleteVisibility = (visibility) => dispatch => {
    dispatch({
        type: SET_VISIBILITY,
        payload: visibility
    })
}


