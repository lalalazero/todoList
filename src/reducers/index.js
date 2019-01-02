import initStore from "../store";

const reducers = (state = initStore, action)=>{
    switch(action.type){
        case 'todos':{
            return({
                ...state,
                todos: action.payload
            })
        }
        case 'lists': {
            return({
                ...state,
                lists: action.payload
            })
        }
        case 'switchList': {
            let item = state.lists.find(obj => obj.id === action.payload)
            console.log('switch..item..',item)
            return({
                ...state,
                curList: item || {}
            })
        }
        case 'updateTodoNumbers': {
            let item = state.lists.find(obj => obj.id === action.payload.listId)
            console.log('updateTodoNumbers..',item)
            item.validCount += action.payload.count
            console.log('updateTodoNumbers..', item)
            return({
                ...state,
                lists: state.lists
            })
        }
        default: return state
    }
}

export default reducers