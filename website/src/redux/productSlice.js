import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {reducers, extraReducers} from './reducers/productReducer'

import { fetchAllProduct, fetchProduct } from '../services/products-service';


export const fetchAllProductAsync = createAsyncThunk(
    'product/fetchAllProduct',
    async () => {
        const response = await fetchAllProduct();
        return response.json();
    }
);

export const fetchProductAsync = createAsyncThunk(
    'product/fetchProduct',
    async (id) => {
        const response = await fetchProduct(id);
        return response.json();
    }
);

const initialState = {
  products: [],
  product: {},
  wishList: [],
  myCart: [],
  status: 'idle',
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: reducers,
  extraReducers: extraReducers,
});

export const { updateStatus,
                addMyCart,
                addWishList,
                removeMyCart,
                removeWishList } = productSlice.actions;

export const products = (state) => state.products;

export default productSlice.reducer;
