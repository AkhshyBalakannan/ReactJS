import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProduct, fetchProduct } from '../services/products-service';

const initialState = {
  products: [],
  product: {},
  status: 'idle',
};

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

export const productSlice = createSlice({
  name: 'product',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    updateStatus: (state) => {
      state.status = state.status === 'idle' ? 'loading' : 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.data;
      })
      .addCase(fetchProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.product = action.payload.data;
      });
  },
});

export const { updateStatus } = productSlice.actions;

export const products = (state) => state.products;

export default productSlice.reducer;
