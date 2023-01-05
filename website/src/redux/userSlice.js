import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { reducers, extraReducers } from './reducers/userReducer';
import { signInUser, createUser } from '../services/auth-service'


const initialState = {
  userAuth: false,
  id: null,
  email: null,
  first_name: null,
  last_name: null,
  username: null,
  errorMessage: null,
  token: null,
  status: 'idle',
};

export const signInAsync = createAsyncThunk(
  'user/fetchSignIn',
  async (password, { getState }) => {
    const userDetail = user(getState())
    const req = {...userDetail}
    req["password"] = password
    const response = await signInUser(req)
    return response.json()
  }
);

export const signUpAsync = createAsyncThunk(
  'user/fetchSignUp',
  async (password, { getState }) => {
    const userDetail = user(getState())
    const req = {...userDetail}
    req["password"] = password
    const response = await createUser(req)
    return response.json()
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: reducers,
  extraReducers: extraReducers,
});

export const { updateUser, updateStatus, updateToken, updateUserAuth, updateErrorMessage, logOutUser } = userSlice.actions;

// For example: `useSelector((state: RootState) => state.counter.value)`
export const user = (state) => state.user

export default userSlice.reducer;
