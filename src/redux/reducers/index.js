import { combineReducers } from 'redux';
import auth from './auth';
import navBar from './navBar';
import login from './login';

export default combineReducers({
  auth,
  navBar,
  login
});
