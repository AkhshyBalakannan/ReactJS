import { configureStore } from '@reduxjs/toolkit';
import throttle from 'lodash.throttle';
import productSlice from '../redux/productSlice';
import { loadState, saveState } from './localStorage'

const preloadedState = loadState();

export const store = configureStore({
  reducer: {
    products: productSlice
  },
  preloadedState
});

store.subscribe(throttle(() => {
  saveState({
    products: store.getState().products
  });
}, 500));
