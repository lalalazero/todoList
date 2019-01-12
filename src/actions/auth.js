import { request } from "../utils/request";
export const SET_AUTH = 'set_auth'

export const isAuthed = ()=> async (dispatch,getState) => {
    const res = request('valid')
    if(res && res.status === 0){
        await dispatch({
            type: SET_AUTH,
            payload: true
        })
    }else{
        await dispatch({
            type: SET_AUTH,
            payload: false
        })
    }
}
