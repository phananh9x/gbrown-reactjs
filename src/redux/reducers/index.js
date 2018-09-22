import { combineReducers } from 'redux';
import auth from './auth';
import navBar from './navBar';
import login from './login';
import userReducer from './userReducer';
import chatPurchaseReducer from './chatPurchaseReducer';

export default combineReducers({
  auth,
  navBar,
  login,
  userReducer,
  chatPurchaseReducer
});
