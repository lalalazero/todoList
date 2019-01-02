import initStore from "../store";

const reducers = (state = initStore, action)=>{
    switch(action.type){
        case 'todos':{
            return({
                ...state,
                todos: action.payload
            })
        }
        default: return state
    }
}

export default reducers