import { request } from "./../utils/request";
import { refreshUserList } from './list'
export const LIST_TODO_LOADED = 'list_todo_loaded'
export const LIST_COMPLETE_LOADED = 'list_complete_loaded'
export const SET_CURRENT_TODO = 'set_current_todo'

export const loadListTodos = (listId) => async (dispatch) => {
    const res = await request(`lists/items?id=${listId}&type=0`)
    if(res.status === 0){
        await dispatch({
            type: LIST_TODO_LOADED,
            payload: res.data
        })
    }
    
}

export const loadListComplete = (listId) => async (dispatch) => {
    const res = await request(`lists/items?id=${listId}&type=1`)
    if(res.status === 0){
        await dispatch({
            type: LIST_COMPLETE_LOADED,
            payload: res.data
        })
    }
    
}

export const setCurrentTodo = (todoId) => dispatch => {
    dispatch({
        type: SET_CURRENT_TODO,
        payload: todoId
    })
}

export const addTodo = (name) => async (dispatch,getState) => {
    const curList = getState().curListItem.id
    const res = await request(`lists/items?id=${curList}&value=${name}`,{ method: 'POST' })
    if(res.status === 0){
        await dispatch(loadListTodos(curList))
        await dispatch(refreshUserList()) // 只是为了更新数字
    }
}

const refreshTodos = async (dispatch,getState)=> {
    const store = getState()
    const listId = store.curListItem.id
    const curTodo = store.curTodo
    // 刷新待办列表
    await dispatch(loadListTodos(listId))
    if(store.visible === true){
        // 刷新完成列表
        await dispatch(loadListComplete(listId))
    }
    // 刷新todo详情侧边栏
    if(store.contentVisible === true){
        await curTodo.id && dispatch(setCurrentTodo(curTodo.id))
    }
}

export const checkTodo = (todoId, status) => async (dispatch,getState) => {
    const res = await request(`lists/items/status?id=${todoId}&status=${status}`,{ method: 'PUT'})
    if(res.status === 0){
        refreshTodos(dispatch,getState)
        dispatch(refreshUserList()) // 只是为了更新数字
    }
}

export const deleteTodo = (todoId) => async (dispatch,getState) => {
    const res = await request(`lists/items?id=${todoId}`,{ method: 'DELETE' })
    if(res.status === 0){
        refreshTodos(dispatch,getState)
        dispatch(refreshUserList()) // 只是为了更新数字
    }
}

export const modifyTodo = (todoId,title,note) => async (dispatch,getState) => {
    const res = await request(
        `lists/items`,
        {
            method: 'PUT',
            body: {
            id: todoId,
            title: title,
            note: note
            }
        })
    if(res.status === 0){
        refreshTodos(dispatch,getState)
        dispatch(refreshUserList()) // 只是为了更新数字
    }
}


