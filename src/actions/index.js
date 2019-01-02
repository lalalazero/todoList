const switchList = (id)=>{ // 切换清单
    return({
        type: 'switchList',
        payload: id
    })  
}

const updateTodoNumbers = (listId,count) => {
    return({
        type: 'updateTodoNumbers',
        payload: {
            listId: listId,
            count: count
        }
    })
}

export default switchList;