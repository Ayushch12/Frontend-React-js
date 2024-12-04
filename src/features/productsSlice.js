
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getProducts,
  addProduct,
  updateProductApi,
  deleteProductApi,
} from "../services/api";


export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await getProducts();
  return response;
});


export const createProduct = createAsyncThunk("products/createProduct", async (product) => {
  const response = await addProduct(product);
  return response;
});

export const updateProduct = createAsyncThunk("products/updateProduct", async (product) => {
  const response = await updateProductApi(product);
  return response;
});


export const deleteProduct = createAsyncThunk("products/deleteProduct", async (id) => {
  await deleteProductApi(id);
  return id;
});

const productsSlice = createSlice({
  name: "products",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;


