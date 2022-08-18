import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import ordersReducer from './ordersSlice'
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

const rootReducer = combineReducers(
  { ordersList: ordersReducer }
  );

  const confStore = () => {
    return configureStore({reducer: rootReducer}, applyMiddleware(thunk));
  }
  export default confStore;