import {combineReducers} from '@reduxjs/toolkit'

import songQueue from '../slices/songQueue';

const rootReducer = combineReducers({
    songQueue: songQueue,
})

export default rootReducer;