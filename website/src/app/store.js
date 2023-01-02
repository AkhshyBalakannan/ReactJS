import { configureStore } from '@reduxjs/toolkit';
import throttle from 'lodash.throttle';
import counterReducer from '../store/userSlice';
import { loadState, saveState } from './localStorage'

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  preloadedState
});

store.subscribe(throttle(() => {
  saveState({
    counter: store.getState().counter
  });
}, 500));
