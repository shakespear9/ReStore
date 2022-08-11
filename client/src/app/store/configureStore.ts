// import { configureStore } from '@reduxjs/toolkit'
import {createStore} from 'redux'
import counterReducer from '../../feature/contact/counterReducer'

export function configureStore() { 
    return createStore(counterReducer);
}

// export const store = configureStore({
//     reducer: {
        
//     }
// })