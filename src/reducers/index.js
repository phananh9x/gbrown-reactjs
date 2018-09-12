import { combineReducers } from 'redux'

import auth from './auth'
import navBar from './navBar';

export default combineReducers({
    auth,
    navBar
})