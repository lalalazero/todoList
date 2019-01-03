import { all } from 'redux-saga/effects'
export function* helloSaga(){
    yield console.log('hello saga...')
}

export default function* rootSaga(){
    yield all([
        helloSaga()
    ])
}