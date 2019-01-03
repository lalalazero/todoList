import { request } from './../utils/request'

const USER_LIST_LOADED = 'userListLoaded'

export const loadUserList = (userId) => dispatch => {
    return request(`lists?userid=${userId}`).then(res => {
        if(res.status === 0){
            dispatch({
                type: USER_LIST_LOADED,
                payload: res.data
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

