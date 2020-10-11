import { combineReducers } from 'redux';
import authReducer from './authReducer';
import productReducer from './productReducer';
import slideReducer from './slideReducer';

export default combineReducers({
  authReducer,
  productReducer,
  slideReducer,
});
