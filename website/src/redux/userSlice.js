import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {userReducer, extraReducers } from './reducers/userReducer';

const initialState = {
  userAuth: false,
  email: '',
  api: null,
  status: 'idle',
};

export const incrementAsync = createAsyncThunk(
  'user/fetchAuth',
  async () => {
    const response = await fetch()
    return response.data
  }
);

export const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: userReducer,
  extraReducers: extraReducers,
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};

export default counterSlice.reducer;
