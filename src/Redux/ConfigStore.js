import {combineReducers, createStore} from 'redux';
import {QLSVReducer} from './QLSVReducer'

// Nơi chứa các reducer
const rootReducer = combineReducers({
    QLSVReducer,
})

export const store = createStore(rootReducer)