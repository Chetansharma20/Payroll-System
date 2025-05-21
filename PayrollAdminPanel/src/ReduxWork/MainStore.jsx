import { combineReducers, configureStore } from '@reduxjs/toolkit'
import CompanyReducer,  { logout } from './UserSlice'
import persistReducer from 'redux-persist/es/persistReducer';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import persistStore from 'redux-persist/es/persistStore';




const timeoutMiddleware = store=> next => action =>
{
    const result = next(action);
    if (action.type === '/') 
        {
            setTimeout(()=>
            {
                store.dispatch(logout())
            },5000)
        
    }
    return result
}

const persistConfig  = {
    key:"user",
    version:1,
    storage,
}
const rootReducer = combineReducers({
    user:CompanyReducer
})
const persistedReducer  = persistReducer(persistConfig, rootReducer)

 const MainStore = configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({serializableCheck:
            {
                ignoreActions:[FLUSH, REHYDRATE, PAUSE, PERSIST,PURGE,REGISTER],}
                ,})
                .concat(timeoutMiddleware)
            }
        )
            
// let MainStore = configureStore({
//     reducer:{
//         user: CompanyReducer
//     }

export default MainStore;
export const Persistor = persistStore(MainStore)