import { combineReducers } from 'redux';
import auth, { AuthStore } from './auth';

export interface AppStore {
    auth: AuthStore,
}


const rootReducer = combineReducers({
    auth
});

export default rootReducer;