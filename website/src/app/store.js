import { configureStore } from '@reduxjs/toolkit';
import throttle from 'lodash.throttle';
import productSlice from '../redux/productSlice';
import userSlice from '../redux/userSlice';
import { loadState, saveState } from './localStorage'

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    products: productSlice,
    user: userSlice,
  },
  preloadedState
});

store.subscribe(throttle(() => {
  saveState({
    products: store.getState().products,
    user: store.getState().user
  });
}, 500));
