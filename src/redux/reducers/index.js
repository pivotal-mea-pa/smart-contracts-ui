import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import profileReducer from './profileReducer';
import tenderReducer from './tenderReducer';
import rftReducer from './rftReducer';
import rfpReducer from './rfpReducer';
import notificationReducer from './notificationReducer';
import clarificationReducer from './clarificationReducer';
import bondReducer from './bondReducer';
import awardReducer from './awardReducer';
import auctionReducer from './auctionReducer';

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  profiles: profileReducer,
  tenders: tenderReducer,
  rfts: rftReducer,
  rfps: rfpReducer,
  notifications: notificationReducer,
  clarifications: clarificationReducer,
  bonds: bondReducer,
  awards: awardReducer,
  auction: auctionReducer
});
